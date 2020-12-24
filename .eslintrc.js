module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        //'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'vue/html-indent': ['error', 4],
        indent: ['error', 4],
        camelcase: ['error'],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 6,
            },
        ],
    },
    plugins: ['vue'],
}
