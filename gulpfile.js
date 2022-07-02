const {src, dest} = require('gulp');
const miniFyJs = require('gulp-uglify');

const bundleJs = () => {
    return src('./src/**/*.js').pipe(miniFyJs()).pipe(dest('./dist/'));
}
exports.bundleJs = bundleJs;
