module.exports = {
  load: (src) => {
    return new Promise((resolve, reject) => {
      let shouldLoad = true;

      for (let i = 0; i <= document.scripts.length; i++) {
        if (document.scripts[i] && document.scripts[i].src.indexOf(src) !== -1) {
          shouldLoad = false;
          break;
        }
      }

      if (shouldLoad) {
        const head   = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');

        script.type  = 'text/javascript';
        script.defer = true;
        script.async = true;
        script.src   = src;

        script.onload = () => {
          resolve();
        };

        script.onerror = () => {
          reject();
        };
        head.appendChild(script);
      } else {
        resolve();
      }
    })
  }
};
