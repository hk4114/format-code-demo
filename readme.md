# format-code-demo

> vite create react project

```sh
pnpm create vite react-app -- --template react-ts
```

`vscode` 和 `prettier` 会有很多默认配置，可以通过 `CTRL + ,` 快捷键进入配置界面进行管理，所有修改后的结果会保存在 `settings.json` 文件里。

## 用 eslint 对代码进行校验

1. 在项目内安装 `eslint` 及相关的包
2. 给 `vscode` 安装 `eslint` 插件

```sh
pnpm add -D eslint 
pnpm create @eslint/config
# vscode 安装 eslint 插件
pnpm add -D eslint-plugin-react-hooks

# 尝试
npx eslint ./src/App.tsx
```

eslint-plugin-react-hooks 用于自动检查Hook代码是否符合使用规则的插件。

```js
"extends": [
  // ...
  "plugin:react-hooks/recommended",
],
"plugins": [
  // ...
  "react-hooks"
],
"rules": {
  // ...
  "react/prop-types": "off",
}
```


## 用 pretter 对代码进行格式化
```sh
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier 
```

`.eslintrc.js` 中添加 `prettier`, 解决 `eslint` 与 `prettier` 冲突

```js
extends: [
  "prettier",
  "plugin:prettier/recommended"
],
plugins: [ "prettier"],  
```

```js
// .eslintrc.js 全量
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks", "prettier"],
  rules: {
    "react/prop-types": "off",
  },
};
```

配置 `.prettierrc`

```json
// https://www.prettier.cn/docs/configuration.html
{
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "none",
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

配置 `.eslintignore` `.prettierignore`

```bash
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
.eslintrc.js
.prettierrc.js
/src/mock/*
```

`package.json` 添加对应脚本

```json
{
  "scripts": {
    "lint:eslint": "eslint --fix --ext .js,.ts,.tsx ./src",
    "lint:prettier": "prettier --write --loglevel warn \"src/**/*.{js,ts,json,tsx,css,less,scss,html,md}\""
  }
}
```

运行这两句脚本看看效果。

