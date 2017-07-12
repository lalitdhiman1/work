module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {

            files: ['Gruntfile.js', 'app/src/js/**/*.js'],
            options: {
                expr: true
            }
        },

        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "app/src/css/gulfnews.css": "app/src/css/gulfnews.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true,
                    modifyVars: {
                        assetPath: 'assets'
                    }
                },
                files: {
                    "app/build/gulfnews-min.css": "app/src/css/gulfnews.less"
                }
            }
        },

        uglify:{
             production: {
                options: {
                   
                },
                files: {
                    "app/build/gulfnews-min.js": ["app/src/js/gulfnews.js"]
                }
            }
        },

        watch: {
            files: ['app/src/**/*.*', 'app/sandbox/index.html'],
            tasks: ['less:development','jshint'],
            options: {
                livereload: true
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    open: {
                        target: 'http://localhost:8000/app/sandbox/'
                    }
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');    
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['jshint', 'uglify:production', 'less:production', 'build-dist']);


    grunt.registerTask('dev', ['connect', 'watch']);

    grunt.registerTask('build-dist', 'Building distribution', function() {
       
    });

};