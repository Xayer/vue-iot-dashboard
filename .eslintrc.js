module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
		'@vue/typescript',
		"prettier",
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		"indent": [2, "tab"],
		'no-tabs': 'off',
		'no-confusing-arrow': 'off',
		'prefer-default-export': 'off',
		'import/prefer-default-export': 'off',
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				jest: true,
			},
		},
	],
};
