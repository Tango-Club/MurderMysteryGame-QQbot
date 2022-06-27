module.exports = {
	env: { node: true },
	parser: '@typescript-eslint/parser',
	parserOptions: {
		// project: './tsconfig.json',
	},
	//prettier-ignore
	plugins: [
		'prettier', 
		// '@typescript-eslint',
	],
	extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'prefer-const': [0],
				'@typescript-eslint/no-inferrable-types': [0],
				'@typescript-eslint/no-namespace': [0]
			}
		}
	],
	rules: {
		'prettier/prettier': 'error',
		'prefer-const': [0],
		'linebreak-style': ['error', 'unix'],
		semi: ['error', 'always'],
		'no-console': [1, { allow: ['warn', 'error', 'log'] }],
		'no-unused-vars': [0],
		'@typescript-eslint/no-explicit-any': [0],
		'@typescript-eslint/no-unused-vars': [0],
		'@typescript-eslint/no-use-before-define': [0],
		'@typescript-eslint/explicit-member-accessibility': [0],
		'@typescript-eslint/no-var-requires': [0],
		'@typescript-eslint/no-non-null-assertion': [0],
		'@typescript-eslint/camelcase': [0],
		'@typescript-eslint/no-object-literal-type-assertion': [0],
		'@typescript-eslint/explicit-function-return-type': [0]
	}
};
