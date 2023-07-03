import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import eslint from '@rollup/plugin-eslint'
import terser from '@rollup/plugin-terser'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json' assert { type: 'json' }

const banner =
`/**
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`

const extensions = [...DEFAULT_EXTENSIONS, 'ts', 'tsx']
const configMap = {
    esm: {
        file: pkg.module,
        format: 'esm',
    },
    umdDev: {
        file: pkg.main,
        format: 'umd',
        env: 'development',
    },
    umdProd: {
        file: pkg.jsdelivr,
        format: 'umd',
        env: 'production',
    },
    esmBrowserDev: {
        env: 'development',
        file: 'dist/tua-bsl.esm.browser.js',
        format: 'esm',
        transpile: false,
    },
    esmBrowserProd: {
        env: 'production',
        file: 'dist/tua-bsl.esm.browser.min.js',
        format: 'esm',
        transpile: false,
    },
}

const genConfig = (opts) => {
    const isProd = /min\.js$/.test(opts.file)

    const config = {
        input: 'src/index.ts',
        plugins: [
            typescript({
                useTsconfigDeclarationDir: true,
            }),
            eslint({ include: '**/*.js' }),
        ],
        output: {
            file: opts.file,
            name: 'bodyScrollLock',
            banner,
            format: opts.format,
        },
    }

    if (opts.env) {
        config.plugins.push(replace({
            preventAssignment: true,
            values: {
                'process.env.NODE_ENV': JSON.stringify(opts.env),
            },
        }))
    }
    if (opts.transpile !== false) {
        config.plugins.push(babel({ babelHelpers: 'bundled', extensions }))
    }

    if (isProd) {
        config.plugins.push(terser({
            output: {
                ascii_only: true,
            },
        }))
    }

    return config
}

export default Object.keys(configMap)
    .map(key => configMap[key])
    .map(genConfig)
