module.exports = function( grunt ) {
  
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
        // host : 'http://127.0.0.1:8000',
        template: require('grunt-template-jasmine-requirejs'),
	    	templateOptions: {
	        requireConfig: {
	            baseUrl: './'
	        }
	    	}
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "./",
          include: [
            'src/Truss.EventEmitter',
            'src/Truss.Utils',
            'src/Truss.js',
            'src/Truss.Collection',
            'src/Truss.Model',
            'src/Truss.View'
          ],
          out: "compiled.js"
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
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('optimize', ['requirejs']);
  grunt.registerTask('default', ['test']);

};