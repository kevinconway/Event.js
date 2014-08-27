/*jslint node: true, indent: 2, passfail: true */
"use strict";

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jslint: {
      all: {
        src: ['event/*'],
        exclude: ['test/*', 'Gruntfile.js'],
        directives: {
          node: true,
          browser: true,
          indent: 2,
          passfail: true
        },
        options: {
          edition: 'latest'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    },
    browserify: {
      dist: {
        files: {
          'build/event.browser.js': ['event/*']
        },
        options: {
          bundleOptions: {
            "standalone": "eventjs"
          }
        },
      },
      tests: {
        files: {
          'build/event.tests.browser.js': ['test/*.spec.js']
        },
        options: {}
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'build/event.browser.min.js': ['build/event.browser.js'],
          'build/event.tests.browser.min.js': ['build/event.tests.browser.js']
        },
      }
    },
    shell: {
      prepareBrowserTests: {
        command: 'test/install_libs'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['jslint', 'mochaTest', 'browserify', 'uglify', 'shell']);

};
