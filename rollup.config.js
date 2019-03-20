// import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { eslint } from 'rollup-plugin-eslint'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'

const pkg = require('./package.json')

const plugins = [
    // json(),
    eslint(),
    babel(),
    commonjs(),
    nodeResolve({ jsnext: true, main: true, browser: true }),
]

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.module,
                // exports: 'named',
                format: 'es',
            },
        ],
        plugins,
    },
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.main,
                format: 'umd',
                exports: 'named',
                name: 'bodyScrollLock',
            },
        ],
        plugins: [
            ...plugins,
            replace({
                'process.env.NODE_ENV': true,
            }),
        ],
    },
    {
        input: 'src/index.js',
        output: {
            file: `lib/tua-bsl.umd.min.js`,
            format: 'umd',
            exports: 'named',
            name: 'bodyScrollLock',
        },
        plugins: [
            ...plugins,
            replace({
                'process.env.NODE_ENV': false,
            }),
            uglify(),
        ],
    }
]
