var Handlebars = require('handlebars');
var moment = require('moment');

Handlebars.registerHelper("formatDate", function (date) {
    date = moment(date).format('MMMM Do YYYY');
    return date;
});

var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    less = require('metalsmith-less'),
    ignore = require('metalsmith-ignore'),
    autoprefixer = require('metalsmith-autoprefixer'),
    uglify = require('metalsmith-uglify'),
    serve = require('metalsmith-serve'),
    excerpts = require('metalsmith-excerpts');

Metalsmith(__dirname)
    .metadata({
        site: {
            title: 'dustinmalik.com',
            url: 'http://www.dustinmalik.com'
        }
    })
    .source('./src')
    .use(collections({
        posts: {
            pattern: 'blog/posts/*.md',
            sortBy: 'date',
            reverse: true
        },
        lastArticles: {
            pattern: 'blog/posts/*.md',
            sortBy: 'date',
            reverse: true,
            limit: 1
        }
    }))
    .use(markdown())
    .use(excerpts())
    .use(permalinks({
        pattern: ':collections/:title'
    }))
    .use(less({
        pattern: 'styles/home.less',
        render: {
            paths: [
                'src/styles'
            ],
            compress: 'true'
        }
    }))
    .use(templates({
        engine: 'handlebars',
        directory: 'templates',
        partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
    }))
    .use(uglify({removeOriginal: true}))
    .use(autoprefixer())
    .use(ignore(['**/*.less', '**/*.variables', '**/*.overrides', '**/*.config', 'blog/fonts/**/*', 'blog/scripts/**/*', 'blog/styles/**/*', 'blog/themes/**/*']))
    .use(serve())
    .destination('./html')
    .build(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Site build complete!');
        }
    });