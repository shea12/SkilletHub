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
          dest: 'client/compiled/'
        }]
      }
    }
  });

  grunt.registerTask('default', ['babel']);
};