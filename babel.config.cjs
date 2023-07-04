module.exports = {
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    { targets: { node: 'current' } },
                ],
                '@babel/typescript',
            ],
        },
        production: {
            presets: [
                [
                    '@babel/preset-env',
                    { modules: false },
                ],
                '@babel/typescript',
            ],
        },
    },
}
