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
    plugins: ['@babel/plugin-proposal-object-rest-spread']
};