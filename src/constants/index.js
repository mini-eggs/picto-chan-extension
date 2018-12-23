let request = (url, { method = "GET", data } = {}) => {
  return new Promise(resolve => {
    let id = uni();
    let script = document.createElement("script");

    let handle = event => {
      if (event.data.type && event.data.type === `req_${id}`) {
        window.removeEventListener("message", handle);
        document.body.removeChild(script);
        resolve(event.data.res);
      }
    };

    window.addEventListener("message", handle);

    script.innerHTML = `
      var req_${id} = new XMLHttpRequest();
      req_${id}.open("${method}", "${url}");
      req_${id}.onload = function(){window.postMessage({type:"req_${id}",res:JSON.parse(req_${id}.responseText)}, "*");}
      req_${id}.send(${data && JSON.stringify(data)});
    `;

    document.body.appendChild(script);
  });
};

export let uni = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
    .replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))
    .split("-")
    .join("_");

export let fetchPosts = async () => {
  let [_, board, __, thread] = location.pathname.split("/");
  let res = await request(`//a.4cdn.org/${board}/thread/${thread}.json`);
  let posts = res.posts
    .filter(item => !!item.tim && !!item.ext)
    .map(item => ({
      ...item,
      big: `http://i.4cdn.org/${board}/${item.tim}${item.ext}`,
      sml: `http://i.4cdn.org/${board}/${item.tim}s.jpg`
    }));
  return posts;
};

export let eventStop = f => e => {
  e.stopPropagation();
  e.preventDefault();
  f(e);
};
