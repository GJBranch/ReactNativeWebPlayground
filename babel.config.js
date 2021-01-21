module.exports = {
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
    ],
    plugins: [
        ['@babel/plugin-proposal-object-rest-spread'],
        ['module-resolver',
            {
                alias: {
                    'react-native-gesture-handler': '../',
                    'react-native$': require.resolve('react-native-web'),
                },
            },
        ]
    ]
};