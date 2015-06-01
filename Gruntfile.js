module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		bower: {
			install: {
				options: {
					install: true,
					copy: false,
					targetDir: 'app/libs',
					cleanTargetDir: true
				}
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				latedef: true,
				undef: true,
				eqnull: true,
				devel: true
			},
			src: ['Gruntfile.js', 'app/javascript/**/*.js', 'app/**/*.html']
		},

		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			unit: {
				singleRun: true
			},
			continuous: {
				singleRun: false,
				autoWatch: true
			}
		},

		html2js: {
			dist: {
				src: [ 'app/templates/*.html' ],
				dest: 'tmp/templates.js'
			}
		},

    clean: {
      temp: {
        src: [ 'tmp', 'build/app.js' ]
      }
    },

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['app/app.js', 'app/javascript/*.js', 'tmp/*.js'],
				dest: 'build/app.js'
			},
      libs: {
        src: ['app/libs/**/ang*.min.js'],
        dest: 'build/libs/libs.min.js'
      }
		},

    uglify: {
      dist: {
        files: {
          'build/app.min.js': [ 'build/app.js' ]
        },
        options: {
          stripBanners: true,
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %> */'
        }
      }
    },

		cssmin: {
		  target: {
		    files: {
		      'build/css/styles.min.css' : ['app/css/styles.css']
		    }
		  }
		},

    watch: {
      dev: {
        files: [ 'Gruntfile.js', 'app/javascript/**/*.js', 'app/**/*.html' ],
        tasks: [ 'jshint' ],
        options: {
          atBegin: true
        }
      },
      min: {
        files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
        tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist' ],
        options: {
          atBegin: true
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
      base: './build',
      port: 8080,
      keepalive: true
        }
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'archive/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [{
          src: [ 'build/**' ],
          dest: '/'
        }]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/css/styles.css': 'app/scss/styles.scss'
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['app/templates/*'], dest: 'build/templates', filter: 'isFile'},
          {expand: true, flatten: true, src: ['app/customers_data/*'], dest: 'build/customers_data', filter: 'isFile'}
        ]
      }
    }

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['compress']);
	grunt.registerTask('build', ['bower','karma:unit','html2js:dist','concat:dist','uglify:dist','cssmin','clean:temp','compress:dist','copy']);
	grunt.registerTask('dev', ['connect:server']);
	grunt.registerTask('test', ['jshint','karma:continuous']);
	grunt.registerTask('dev1', ['sass']);

};