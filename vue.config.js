'use strict'
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

const _publicPathMap = {
    development: '/',
    // production: '//j1.xxx.com.cn/git/ep-fe/',
    // preview: '//j1.xxx.com.cn/git/ep-fe/',
    // test: '//j1.xxx.com.cn/git/ep-fe/',
}


// 获取 _publicPath
function getPublicPath(i = { useIpHost: false, ip: '' }, p = '') {
    // 保底
    let path = _publicPathMap[process.env.NODE_ENV] || '/'
    // 命令行配置（优先级：2）
    if (p) {
        if (_publicPathMap[p]) {
            path = _publicPathMap[p]
        } else {
            if (p !== true) {
                path = p
            }
        }
    }
    // 使用ip（优先级：1）
    if (i.useIpHost) {
        path = path.replace('j1.58cdn.com.cn', i.ip)
    }
    // 开发配置
    if (process.env.NODE_ENV === 'development') {
        path = _publicPathMap['development']
    }
    // 补 /
    if (path.slice(-1) !== '/') {
        path += '/'
    }
    return path
}

// paddingZero
function pz(val, len = 2) {
    val = val + ''
    if (!val) {
        return val
    }
    if (String(val).length >= len) {
        return val
    }
    return `${new Array(len - 1).fill('0').join('')}${val}`
}


// hash - 时间戳
const _t = new Date()
const _hash = '' + _t.getFullYear() + pz(_t.getMonth() + 1) + pz(_t.getDate()) + pz(_t.getHours()) + pz(_t.getMinutes()) + pz(_t.getSeconds()) + pz(_t.getMilliseconds(), 3)

module.exports = {
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    // devServer: {
    //     open: true,
    //     overlay: {
    //         warnings: false,
    //         errors: true,
    //     },
    //     proxy: {
    //         '/apps': {
    //             target: 'https://xx/',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/apps': '/',
    //             },
    //         },
    //     },
    // },
    css: {
        // loaderOptions: {
        //     postcss: {
        //         plugins: [
        //             require('postcss-plugin-px2rem')({
        //                 rootValue: 37.5, //10:1 转换，例如：设计稿375，设置37.5
        //                 mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
        //                 minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
        //                 // exclude: /(node_module)/, // 排除指定的包，不对其进行转换，通常用于指定第三方包，默认为false
        //                 selectorBlackList: ['ignorepx2rem'], // 模糊匹配
        //             }),
        //         ]
        //     }
        // }
    },
    configureWebpack: config => {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        config.resolve.alias = {
            '@': resolve('src')
        }
    },
    chainWebpack(config) {
        config.plugin('html').tap(args => {
            // args[0].title = '审批'
            args[0].title = '\u200E'
            return args
        })
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')

        if (process.env.NODE_ENV === 'production') {
            // 清除css，js版本号
            config.output.filename(`static/js/[name].${_hash}.js`).end()
            config.output.chunkFilename(`static/js/[name].${_hash}.js`).end()
            // 为生产环境修改配置...
            config.plugin('extract-css').tap(() => [{
                filename: `static/css/[name].${_hash}.css`,
                // chunkFilename: `static/css/[name].${_hash}.css`
            }])
        }

        const imagesRule = config.module.rule('images')
        imagesRule
            .use('url-loader')
            .loader('url-loader')
            .tap((options) => Object.assign(options, { limit: 6144 }))
            .end()

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap((options) => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        // https://webpack.js.org/configuration/devtool/#development
        config.when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-source-map'))
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [path.resolve(__dirname, 'src/styles/variables.scss'), path.resolve(__dirname, 'src/styles/mixins.scss'), path.resolve(__dirname, 'src/styles/theme.scss'), path.resolve(__dirname, 'src/styles/mobile-theme.scss')],
        },
    },
}