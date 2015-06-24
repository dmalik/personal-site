var Metalsmith   = require('metalsmith'),
    markdown     = require('metalsmith-markdown'),
    templates    = require('metalsmith-templates'),
    collections  = require('metalsmith-collections'),
    permalinks   = require('metalsmith-permalinks'),
    less         = require('metalsmith-less'),
    ignore       = require('metalsmith-ignore'),
    //autoprefixer = require('metalsmith-autoprefixer'),
    uglify       = require('metalsmith-uglify'),
    serve        = require('metalsmith-serve'),
    watch        = require('metalsmith-watch'),
    Handlebars   = require('handlebars');

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'dustinmalik.com',
      url: 'http://www.dustinmalik.com'
    }
  })
  .source('./src')
  .use(collections({
    pages: {
      pattern: 'content/pages/*.md'
    },
    posts: {
      pattern: 'content/posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: ':collection/:title'
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
  //.use(autoprefixer())
  .use(ignore(['**/*.less', '**/*.variables', '**/*.overrides', '**/*.config']))
  .use(serve())
  .use(
  watch({
    paths: {
      "${source}/**/*": true,
      "templates/**/*": "**/*.md"
    },
    livereload: true
  })
)
  .destination('./build')
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });