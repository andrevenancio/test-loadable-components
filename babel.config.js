const loadableBabelPlugin = require('@loadable/babel-plugin');

function isWebTarget(caller) {
    return Boolean(caller && caller.target === 'web');
}

function isWebpack(caller) {
    return Boolean(caller && caller.name === 'babel-loader');
}

module.exports = api => {
    const web = api.caller(isWebTarget);
    const webpack = api.caller(isWebpack);

    return {
        presets: [
            '@babel/preset-react',
            [
                '@babel/preset-env',
                {
                    useBuiltIns: web ? 'entry' : undefined,
                    corejs: web ? 'core-js@3' : false,
                    targets: !web ? { node: 'current' } : undefined,
                    modules: webpack ? false : 'commonjs',
                },
            ],
        ],
        plugins: ['@babel/plugin-syntax-dynamic-import', loadableBabelPlugin],
    };
};

/*
.babelrc
{
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    "plugins": [
      "@babel/plugin-proposal-class-properties",
      "dynamic-import-node",
      "@loadable/babel-plugin"
    ]
  }
*/
