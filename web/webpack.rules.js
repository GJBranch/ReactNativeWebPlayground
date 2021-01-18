module.exports = [
    {
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
    },
    {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
            loader: 'url-loader',
            options: {
                name: '[name].[ext]'
            }
        }
    },
    {
        test: /\.(css|scss)$/,
        use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader' // compiles SASS to CSS, using Node Sass by default
        ]
    }
    // {
    //   enforce: 'pre',
    //   test: /\.js$/,
    //   loader: 'source-map-loader',
    // },
];
