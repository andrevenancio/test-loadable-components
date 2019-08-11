const path = require('path');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATH_BUILD = path.join(process.cwd(), 'build/dist');
const PATH_SOURCE = path.join(process.cwd(), 'src');
const ENV = process.env.NODE_ENV || 'development';

const getConfig = target => {
    return {
        name: target,

        mode: ENV,

        target,

        entry: path.join(PATH_SOURCE, 'client', `${target}.js`),

        // in order to ignore all modules in node_modules folder
        externals:
            path === 'node'
                ? ['@loadable/component', nodeExternals()]
                : undefined,

        // devtool: 'cheap-module-eval-source-map',

        output: {
            path: path.join(PATH_BUILD, target),
            filename:
                ENV === 'production'
                    ? '[name]-bundle-[chunkhash:8].js'
                    : '[name].js',
            publicPath: `/dist/${target}/`,
            libraryTarget: target === 'node' ? 'commonjs2' : undefined,
        },

        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            caller: {
                                target,
                            },
                            // babelrc: false,
                            // presets: [
                            //     '@babel/preset-env',
                            //     '@babel/preset-react',
                            // ],
                            // plugins: [
                            //     require('@babel/plugin-proposal-class-properties'),
                            //     require('@babel/plugin-proposal-object-rest-spread'),
                            //     require('@babel/plugin-syntax-dynamic-import'),
                            //     require('@loadable/babel-plugin'),
                            // ],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        'css-loader',
                    ],
                },
            ],
        },

        plugins: [new LoadablePlugin(), new MiniCssExtractPlugin()],
    };
};

module.exports = [getConfig('web'), getConfig('node')];
