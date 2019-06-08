const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		proxy('/repl', {
			target: 'http://localhost:8080',
			pathRewrite: {
				'^/repl/': '/'
			}
		})
	);
};
