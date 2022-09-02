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

> `eslint-plugin-react-hooks` 用于自动检查Hook代码是否符合使用规则的插件。

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
 
> eslint-config-prettier 解决冲突，关掉与 `Prettier` 产生冲突的 `ESlint` 格式相关配置。
> eslint-plugin-prettier 解决冲突后希望通过 `Eslint` 自动保存。

`.eslintrc.js` 中添加 `prettier` 相关配置

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

## 样式校验
> 处理浏览器兼容问题 

vite 默认集成 postcss，所以直接安装其他依赖进行配置。webpack 或者 cra 需要单独安装一下。

```sh
pnpm add -D less autoprefixer postcss-less
```

`*.css` 文件名改成 `*.less`。配置 `vite.config.ts`
```ts
import autoprefixer from "autoprefixer";

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
});
```


```sh
pnpm add -D stylelint stylelint-less stylelint-config-prettier stylelint-config-standard
```
- stylelint-less
- stylelint-config-prettier 关闭所有不必要的或可能与Prettier冲突的规则。确保将其放在 extends 队列最后，这样它将覆盖其他配置。
- stylelint-config-standard 官网提供的 css 标准

其他推荐安装插件：
- stylelint-config-recess-order 属性排列顺序

配置 .stylelintignore .stylelintrc.cjs 

```js
// @see: https://stylelint.io
module.exports = {
  extends: [
    "stylelint-config-standard", // 配置stylelint拓展插件
    "stylelint-config-prettier", // 配置stylelint和prettier兼容
  ],
  "overrides": [
    {
      "files": ["**/*.less"],
      "customSyntax": require("postcss-less"),
      "rules": {
        'comment-empty-line-before': null,
        'declaration-empty-line-before': null,
        'function-name-case': 'lower',
        'no-descending-specificity': null,
        'no-invalid-double-slash-comments': null,
        'rule-empty-line-before': 'always',
      }
    }
  ],
  plugins: ["stylelint-less"], // 配置stylelint less拓展插件
  rules: {
    "rule-empty-line-before": [
      // 要求或禁止在规则声明之前有空行
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ]
  }
};
```

```sh
# .stylelintignore
node_modules
dist
```

添加对应脚本

```json
// package.json
{
  "scripts": {
    "lint:stylelint": "stylelint --cache --fix \"**/*.{less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
  }
}
```

##  代码提交校验
- lint-staged 本地暂存代码检查工具
- husky 操作 git 钩子的工具
- commitlint commit 信息校验工具 (@commitlint/cli @commitlint/config-conventional)
- commitizen cz-git 辅助 commit 信息 ,就像这样,通过选择输入,规范提交信息

```sh
pnpm add lint-staged husky -D
# 在 package.json 中添加脚本
npm set-script prepare "husky install"

# 初始化husky 将 git hooks 钩子交由 husky 执行
pnpm prepare
npx husky add .husky/pre-commit "npx lint-staged"
# package.json 添加 lint-staged 脚本
npm set-script lint-staged "lint-staged"
```

根目录创建 `.lintstagedrc.json` 进行配置，或者通过 `lint-staged.config.js` 进行配置。

```json
{
	"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
	"{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
	"package.json": ["prettier --write"],
	"*.{scss,less,styl}": ["stylelint --fix", "prettier --write"],
	"*.md": ["prettier --write"]
}
```

commit 提交时，信息模板的依赖

> [cz-git 指南]https://cz-git.qbb.sh/zh/guide/

```sh
pnpm add @commitlint/cli @commitlint/config-conventional -D
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
# 安装辅助提交依赖
pnpm i commitizen cz-git -D

# 安装指令和命令行的展示信息
npm set-script commit "git-cz" # package.json 中添加 commit 指令, 执行 `git-cz` 指令
```

添加 commitlint.config.cjs 并且配置

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'build',
        'chore',
        'revert',
        'style',
        'test'
      ]
    ],
    'type-empty': [2, 'never'], // <type> 不能为空
    'type-case': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-empty': [2, 'never'], // <subject> 不能为空 (默认)
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],

    'header-max-length': [0, 'always', 72]
  }
}
```

package.json 中,将原来commit配置,变更为自定义配置

```json
"config": {
		"commitizen": {
			"path": "node_modules/cz-git"
		}
	}
```