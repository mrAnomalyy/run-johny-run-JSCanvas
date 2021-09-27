class Request {
  constructor(method, url, params, callback) {

    this.adapter = new XMLHttpRequest();
    this.method = method;
    this.url = url;
    this.params = params;
    this.callback = callback;

    this.adapter.open(this.method, this.url);
    this.adapter.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    this.adapter.onreadystatechange = function () {
      if (this.adapter.readyState == 4) {
        this.callback(this.adapter.responseText);
      }

    }.bind(this);

    this.adapter.send(this.params);

  }
}