module.exports = {
	devServer: {
		proxy: {
			'weather-api/*': {
				target: 'http://api.openweathermap.org/',
				changeOrigin: true,
			},
		},
	},
};
