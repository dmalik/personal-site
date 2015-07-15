var Handlebars = require('handlebars');
var moment     = require('moment');

Handlebars.registerHelper("formatDate", function (date) {
  date = moment(date).format('MMMM Do YYYY');
  return date;
});

Handlebars.registerHelper("generateLink", function (title) {
  title = title.toLowerCase();
  title = title.split(' ').join('_');
  title = "/blog/posts/"+title;
  return title;
});


var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    less        = require('metalsmith-less'),
    ignore      = require('metalsmith-ignore'),
    uglify      = require('metalsmith-uglify'),
    serve       = require('metalsmith-serve'),
    excerpts    = require('metalsmith-excerpts');

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
      limit: 4
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: ':collections/:title'
  }))
  .use(excerpts())
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
  .use(ignore(['**/*.less', '**/*.variables', '**/*.overrides', '**/*.config', 'blog/fonts/**/*', 'blog/scripts/**/*', 'blog/styles/**/*', 'blog/themes/**/*', 'thanks/fonts/**/*', 'thanks/scripts/**/*', 'thanks/styles/**/*', 'thanks/themes/**/*', 'thanks/images/**/*']))
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