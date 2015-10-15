# eslint-plugin-bo-tools

ESLint plugin for rules I care about

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-bo-tools`:

```
$ npm install eslint-plugin-bo-tools --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-bo-tools` globally.

## Usage

Add `bo-tools` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "bo-tools"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "bo-tools/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





