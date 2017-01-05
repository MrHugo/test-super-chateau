module.exports = function () {
    var root = 'src/';
    var app = root + 'app/';

    var build = {
        path: 'dist/'
    };

    var fonts = {
        in: ['app/fonts/*.*'],
        out: 'dist/fonts'
    };

    var browserSync = {
        dev: {
            injectChanges: true,
            reloadDelay: 500,
            open: false,
            port: 3000,
            server: {
                baseDir: './dist'
            }
        },
        prod: {
            port: 3001,
            open: false,
            server: {
                baseDir: './' + build.path
            }
        }
    };

    var config = {
        root: root,
        app: app,
        fonts: fonts,
        browserSync: browserSync
    };

    return config;

};
