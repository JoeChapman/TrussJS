module.exports = function( grunt ) {
  
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    
    dirs: {
      src: 'src',
      spec: 'spec',
      dest: 'dist/<%= pkg.name %>/<%= pkg.version %>'
    },

    meta : {
      src   : '<%= dirs.src %>/*.js',
      spec : '<%= dirs.spec %>/**/*.spec.js'
    },

    watch: {
      test : {
        files: ['<%= meta.src %>','<%= meta.spec %>'],
        tasks: 'test'
      }
    },

    jasmine : {
      src : '<%= meta.src %>',
      options : {
        specs : '<%= meta.spec %>',
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
          uglify: {
            toplevel: true,
            ascii_only: true,
            beautify: false,
            max_line_length: 100,
            //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
            no_mangle: false
          },
          baseUrl: "./",
          include: [
            'src/Truss.EventEmitter',
            'src/Truss.Utils',
            'src/Truss.js',
            'src/Truss.Collection',
            'src/Truss.Model',
            'src/Truss.View'
          ],
          out: '<%= pkg.name %>.<%= pkg.version %>-min.js'
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        '<%= meta.src %>',
        '<%= meta.spec %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Custom tasks
  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('optimize', ['requirejs']);
  grunt.registerTask('default', ['test']);

};