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
    }
  });

  // grunt.registerTask('default', ['']);
  grunt.registerTask('compile', ['babel', 'browserify']);
};