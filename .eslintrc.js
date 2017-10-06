module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        mocha: true
    },
    extends: 'birhoff',

    overrides: [
        {
            files: ['*.test.js'],
            env: { mocha: true },
            globals: {
                expect: false,
                sinon: false
            }
        }
    ]
};
