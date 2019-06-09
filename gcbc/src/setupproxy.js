const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/gcbc", {
      target: "http://52.87.163.20:5001",
      pathRewrite: {
        "^/gcbc/": "/"
      }
    })
  );
};
