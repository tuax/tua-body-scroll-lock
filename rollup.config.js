import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { eslint } from 'rollup-plugin-eslint'
import { uglify } from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const banner =
`/**
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`
const plugins = [ eslint(), babel() ]

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
        file: `dist/tua-bsl.umd.min.js`,
        format: 'umd',
        env: 'production',
    },
}

const genConfig = (opts) => {
    const isProd = /min\.js$/.test(opts.file)

    const config = {
        input: 'src/index.js',
        plugins: plugins.slice(),
        output: {
            file: opts.file,
            format: opts.format,
            banner,
            name: 'bodyScrollLock',
        },
    }

    if (opts.env) {
        config.plugins.push(replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
        }))
    }

    if (isProd) {
        config.plugins.push(uglify())
    }

    return config
}

export default Object.keys(configMap)
    .map(key => configMap[key])
    .map(genConfig)
