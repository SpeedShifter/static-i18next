/*
 * grunt-static-i18next
 * 
 *
 * Copyright (c) 2014 Stas Yermakov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    yeoman: {
      // configurable paths
      src: 'src',
      dist: 'dist',
      test_app: 'test/fixtures/app'
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      typescript: {
        files: ["<%= yeoman.src %>/**/*.ts"],
        tasks: ["typescript", "test"]
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        '<%= yeoman.dist %>/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    // Compile TypeScript source codes
    typescript: {
      dist: {
        src: ['<%= yeoman.src %>/**/*.ts'],
        dest: '<%= yeoman.dist %>',
        options: {
          expand: true,
          target: 'es5', //or es3
          rootDir: '<%= yeoman.src %>/',
          sourceMap: false,
          declaration: false,
          module: 'commonjs'
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= yeoman.dist %>/*',
              '!<%= yeoman.dist %>/.git*'
            ]
          }
        ]
      },
      server: '.tmp'
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'typescript'
      ],
      test: [
        'typescript'
      ],
      dist: [
        'typescript'
      ]
    }
  });

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'watch'
    ]);
  });

  // Whenever the "test" task is run, first clean the ".tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
