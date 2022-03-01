const ItemListInstance = {
  instance: null
};
(function () {
  class ItemList {
    constructor() {
      this.opt = {
        container: ".apps-wrapper",
        token: "MY_TOKEN",
        requestUrl: null,
        classes: {
          item: "item",
          list: "wrapper"
        },
        template: {
          item: `<li class="{classes.item}">
                    <a href="{link}">
                      <img src="{icon}" />
                      <span>{title}</span>
                    </a>
                  </li>`,
          list: `<ul class="{classes.list}">{child}</ul>`
        }
      }
    }

    init(options) {
      this.opt = Object.assign(this.opt, options);
      if (!this.opt.requestUrl) {
        throw "requestURL is required";
      }
      this.request();

    }

    binder(item) {
      let result = this.opt.template.item;
      result = result.replace("{classes.item}", this.opt.classes.item);
      result = result.replace("{link}", item["url"]);
      result = result.replace("{icon}", item["icon"]);
      result = result.replace("{title}", item["title"]);
      return result;
    }

    request() {
      console.log(this.opt.token);
      let match = document.cookie.match(
        new RegExp('(^| )' + this.opt.token + '=([^;]+)'));
      let _instance = this;
      if (match) {
        let xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {
          if (xmlHttp.status == 200) {
            var result = JSON.parse(xmlHttp.responseText);
            console.log(_instance.opt);
            let response = _instance.opt.template.list.replace("{classes.list}",
              _instance.opt.classes.list);
            let childString = "";
            if (result && result.length > 0) {
              for (let i = 0; i < result.length; i++) {
                childString += _instance.binder(result[i]);
              }
            }
            document.querySelector(
              _instance.opt.container).innerHTML = response.replace("{child}",
              childString);
          }
        };

        xmlHttp.open("GET",
          this.opt.requestUrl, false);
        xmlHttp.setRequestHeader("Authorization", "Bearer " + match[2]);
        xmlHttp.send(null);

      } else {
        console.log('--something went wrong---');
      }
    }
  }

  ItemListInstance.instance = new ItemList();
})();
