module.exports = grunt => {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    babel: {
      options: {
          sourceMap: 'inline',
          presets: ['es2015', 'react'],
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'client/source/',
          src: '**/*.jsx',
          dest: 'client/compiled/',
          ext: '.js'
        }]
      }
    },

    browserify: {
      main: {
        src: 'client/compiled/**/*.js',
        dest: 'client/deploy/bundle.js'
      }
    },

    watch: {
      babel: {
        files: ['client/source/**/*.jsx'],
        tasks: ['babel']
      },
      browserify: {
        files: ['client/compiled/**/*.js'],
        tasks: ['browserify']
      }
    },
  });

  // grunt.registerTask('default', ['']);
  grunt.registerTask('build', ['babel', 'browserify']);
};