const path = require('path');
module.exports = [
    {
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        exclude: /node_modules\/(?!react-native|@react-navigation|react-navigation)/,
        use: {
            loader: 'babel-loader',
            // loader: 'ts-loader',
            options: {
                babelrc: false,
                configFile: false,
                presets: [
                    ['module:metro-react-native-babel-preset'],
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                node: 'current',
                            },
                        },
                    ],
                    ['@babel/preset-typescript']
                ],
                plugins: [
                    ['@babel/plugin-proposal-object-rest-spread'],
                    ['@babel/plugin-proposal-class-properties'],
                    ['react-native-web'],
                    ['module-resolver',
                        {
                            alias: {
                                // Even though the plugin react-native-web/babel solves this case
                                // It is necessary to alias so that resolves inside of react-native-vector-icons
                                // works too
                                // 'react-native-gesture-handler': '../',
                                'react-native$': require.resolve('react-native-web'),
                                'react-navigation': path.resolve(__dirname, './react-navigation.web.js'),
                            },
                        },
                    ]
                ]
            }
        }
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
