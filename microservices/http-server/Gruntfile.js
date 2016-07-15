exports = module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      all: {
        //src: ['**/*.spec.js', '!node_modules/**/*', '!common-ui/bower_components/**/*', '!microservices/**/*']
        src: ['rest-server/**/*.spec.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('test',['mochaTest']);
}
