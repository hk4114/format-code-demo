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
  rules: {}
};