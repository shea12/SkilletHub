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

    htmlmin: {                                     // Task 
      dist: {                                      // Target 
        options: {                                 // Target options 
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files 
          'client/deploy/index.html': 'client/source/index.html',     // 'destination': 'source' 
        }
      },
      dev: {                                       // Another target 
        files: {
          'dist/index.html': 'src/index.html',
          'dist/contact.html': 'src/contact.html'
        }
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