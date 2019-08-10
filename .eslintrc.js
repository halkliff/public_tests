module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint",
    "airbnb",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
    "plugin:react/latest",
    "plugin:jest/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2019,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint/eslint-plugin", "react", "react-hooks", "jest"],
  rules: {
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    quotes: ["error", "single", { allowTemplateLiterals: true }],
    "@typescript-eslint/tslint/config": [
      "warn",
      {
        rules: {
          "adjacent-overload-signatures": true,
          // Do not allow the subtle/obscure comma operator.
          "ban-comma-operator": true,
          // Do not allow internal modules or namespaces . These are deprecated in favor of ES6 modules.
          "no-namespace": true,
          // Do not allow parameters to be reassigned. To avoid bugs, developers should instead assign new values to new vars.
          "no-parameter-reassignment": true,
          // Force the use of ES6-style imports instead of /// <reference path=> imports.
          "no-reference": true,
          // Do not allow type assertions that do nothing. This is a big warning that the developer may not understand the
          // code currently being edited (they may be incorrectly handling a different type case that does not exist).
          "no-unnecessary-type-assertion": true,
          // Disallow nonsensical label usage.
          "label-position": true,
          // Disallows the (often typo) syntax if (var1 = var2). Replace with if (var2) { var1 = var2 }.
          "no-conditional-assignment": true,
          // Disallows constructors for primitive types (e.g. new Number('123'), though Number('123') is still allowed).
          "no-construct": true,
          // Do not allow super() to be called twice in a constructor.
          "no-duplicate-super": true,
          // Do not allow the same case to appear more than once in a switch block.
          "no-duplicate-switch-case": true,
          // Do not allow a variable to be declared more than once in the same block. Consider function parameters in this
          // rule.
          "no-duplicate-variable": [true, "check-parameters"],
          // Disallows a variable definition in an inner scope from shadowing a variable in an outer scope. Developers should
          // instead use a separate variable name.
          "no-shadowed-variable": true,
          // Empty blocks are almost never needed. Allow the one general exception: empty catch blocks.
          "no-empty": [true, "allow-empty-catch"],
          // Functions must either be handled directly (e.g. with a catch() handler) or returned to another function.
          // This is a major source of errors in Cloud Functions and the team strongly recommends leaving this rule on.
          "no-floating-promises": true,
          // Do not allow any imports for modules that are not in package.json. These will almost certainly fail when
          // deployed.
          "no-implicit-dependencies": [true, ["@utils", "@app"]],
          // The 'this' keyword can only be used inside of classes.
          "no-invalid-this": true,
          // Do not allow strings to be thrown because they will not include stack traces. Throw Errors instead.
          "no-string-throw": true,
          // Disallow control flow statements, such as return, continue, break, and throw in finally blocks.
          "no-unsafe-finally": true,
          // Expressions must always return a value. Avoids common errors like const myValue = functionReturningVoid();
          "no-void-expression": [true, "ignore-arrow-function-shorthand"],
          // Disallow duplicate imports in the same file.
          "no-duplicate-imports": {
            severity: "error"
          },
          // -- Strong Warnings --
          // These rules should almost never be needed, but may be included due to legacy code.
          // They are left as a warning to avoid frustration with blocked deploys when the developer
          // understand the warning and wants to deploy anyway.

          // Warn when an empty interface is defined. These are generally not useful.
          "no-empty-interface": {
            severity: "warning"
          },
          // Warn when an import will have side effects.
          "no-import-side-effect": {
            severity: "warn"
          },
          // Warn when variables are defined with var. Var has subtle meaning that can lead to bugs. Strongly prefer const for
          // most values and let for values that will change.
          "no-var-keyword": {
            severity: "warning"
          },
          // Prefer === and !== over == and !=. The latter operators support overloads that are often accidental.
          "triple-equals": {
            severity: "warning"
          },
          // Warn when using deprecated APIs.
          deprecation: {
            severity: "warning"
          },
          // -- Light Warnings --
          // These rules are intended to help developers use better style. Simpler code has fewer bugs. These would be "info"
          // if TSLint supported such a level.

          // prefer for( ... of ... ) to an index loop when the index is only used to fetch an object from an array.
          // (Even better: check out utils like .map if transforming an array!)
          "prefer-for-of": {
            severity: "warning"
          },
          // Warns if function overloads could be unified into a single function with optional or rest parameters.
          "unified-signatures": {
            severity: "warning"
          },
          // Prefer const for values that will not change. This better documents code.
          "prefer-const": {
            severity: "warning"
          },
          // Multi-line object literals and function calls should have a trailing comma. This helps avoid merge conflicts.
          "trailing-comma": {
            severity: "warning"
          },
          "no-trailing-whitespace": false,
          "variable-name": [
            true,
            "ban-keywords",
            "check-format",
            "allow-leading-underscore"
          ],
          "no-unused-expression": {
            severity: "warn",
            options: ["allow-fast-null-checks", "allow-new"]
          },
          "array-type": false,
          "arrow-parens": true,
          "interface-name": false,
          "max-classes-per-file": false,
          semicolon: [true, "always"],
          "max-line-length": [true, 100],
          "member-access": false,
          "member-ordering": [
            true,
            {
              order: [
                "static-field",
                "instance-field",
                "static-method",
                "instance-method"
              ]
            }
          ],
          "no-consecutive-blank-lines": false,
          "no-console": [true, "debug", "info", "time", "timeEnd", "trace"],
          "no-inferrable-types": [true, "ignore-params"],
          "no-non-null-assertion": true,
          "no-redundant-jsdoc": true,
          "no-switch-case-fall-through": true,
          "no-use-before-declare": true,
          "no-var-requires": false,
          "object-literal-key-quotes": [true, "as-needed"],
          "object-literal-sort-keys": false,
          "ordered-imports": false,
          quotemark: [true, "single"]
        }
      }
    ]
  }
};
