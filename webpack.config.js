const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const modules = {
        js: {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ts-loader',
                },
            ],
        },
        sass: {
            test: /\.s[ac]ss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: { modules: true },
                },
                'sass-loader',
            ],
        },
        sassIsomorph: {
            test: /\.s[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { modules: true },
                },
                {
                    loader: 'sass-loader',
                },
            ],
        },
        img: {
            test: /\.(gif|png|jpe?g)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: [0.65, 0.9],
                            speed: 4,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75,
                        },
                    },
                },
            ],
        },
        svg: {
            test: /\.svg$/,
            use: ['file-loader'],
        },
        font: {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/fonts',
                    },
                },
            ],
        },
        audio: {
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            loader: 'file-loader',
            options: {
                name: 'assets/sounds/[name].[ext]',
            },
        },
    };

    if (env === 'production') {
        modules.sass.use.splice(2, 0, { loader: 'postcss-loader' });
        modules.sassIsomorph.use.splice(2, 0, { loader: 'postcss-loader' });
    }

    const resolve = {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            App: path.resolve(__dirname, 'src/App/'),
            Pages: path.resolve(__dirname, 'src/Pages/'),
        },
    };

    return {
        modules,
        resolve,
    };
};
