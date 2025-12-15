// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist', 'node_modules', 'eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      //regra para proibir o uso do tipo any
      '@typescript-eslint/no-explicit-any': 'error',
      //regra para forçar tipagem de retorno de função
      '@typescript-eslint/explicit-function-return-type': 'error',
      //regra para proibir promessas não tratadas
      '@typescript-eslint/no-floating-promises': 'error',
      //regra para autorizar classes vazias, essencial para nest
      '@typescript-eslint/no-extraneous-class': 'off',
      //regra para proibir variáveis não utilizadas, exceto se começarem com "_"
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      //regra para forçar o uso de PascalCase em nomes de interfaces
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
      ],
      //regra para proibir o uso de tipos inseguros em argumentos de função
      '@typescript-eslint/no-unsafe-argument': 'error', 
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
];