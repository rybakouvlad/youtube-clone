// module.exports = {
//     env: {
//         browser: true,
//         es6: true,
//     },
//     extends: [
//         'airbnb',
//         'prettier',
//         'eslint:recommended',
//         'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
//         'plugin:prettier/recommended',
//         'plugin:@typescript-eslint/recommended',
//     ],
//     globals: {
//         Atomics: 'readonly',
//         SharedArrayBuffer: 'readonly',
//     },
//     parserOptions: {
//         ecmaVersion: 2020,
//         sourceType: 'module',
//         ecmaFeatures: {
//             jsx: true, // Allows for the parsing of JSX
//         },
//     },
//     parser: '@typescript-eslint/parser',
//     rules: {
//         'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
//         'react/jsx-one-expression-per-line': 'off',
//         '@typescript-eslint/rule-name': 'error',
//     },
// };
module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    },
};
