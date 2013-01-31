module.exports = function( grunt ) {
  
  'use strict';

  // Project configuration.
  grunt.initConfig({

    meta : {
      src   : 'src/*.js',
      specs : 'spec/**/*.spec.js'
    },

    watch: {
      test : {
        files: ['<%= meta.src %>','<%= meta.specs %>'],
        tasks: 'test'
      }
    },
    
    jasmine : {
      src : '<%= meta.src %>',
      options : {
        specs : '<%= meta.specs %>',
        // host : 'http://127.0.0.1:8000/',
        template: require('grunt-template-jasmine-requirejs'),
	    	templateOptions: {
	        requireConfig: {
	            baseUrl: './'
	        }
	    	}
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        '<%= meta.src %>',
        '<%= meta.specs %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-jasmine-runner');

  grunt.registerTask('test', ['jshint', 'jasmine']);

  // Default task.
  grunt.registerTask('default', ['test']);

};