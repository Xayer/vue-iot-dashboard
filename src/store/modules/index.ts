const files = require.context('.', false, /\.ts$/);
const modules: {[key: string] : Object } = {};

files.keys().forEach((fileName) => {
	if (fileName === './index.ts') return;
	const moduleName = fileName.replace(/(\.\/|\.ts)/g, '');
	modules[moduleName] = {
		namespaced: true,
		...files(fileName).default,
	};
});
export default modules;
