const CracoLinariaPlugin = require('craco-linaria')
const CracoAntDesignPlugin = require('craco-antd')
const CracoAliasPlugin = require('craco-alias')

module.exports = {
	plugins: [
		{
			plugin: CracoLinariaPlugin,
			options: {
				// Linaria options
			}
		},
		{
			plugin: CracoAntDesignPlugin,
			options: {
				// Antd options
				customizeTheme: {}
			}
		},
		{
			plugin: CracoAliasPlugin,
			options: {
				source: 'tsconfig',
				baseUrl: './src',
				tsConfigPath: './tsconfig.paths.json'
			}
		}
	],
	babel: {
		plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
	}
}
