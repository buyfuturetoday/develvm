module.exports = function(grunt) {

  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Standard tasks
    //---------------

    pkg: '<json:package.json>',
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['*.js', 'JavaScript/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true
      }
    },
    min: {
      dist: {
        src: ['app.js', 'JavaScript/**/*.js'],
        dest: 'dist/built.min.js'
      }
    },

    // Plugin tasks
    //-------------

    doccoh: {
      src: ['*.js', 'JavaScript/**/*.js' ]
    },

    clean: {
      folder: "docs/"
    },

    // Run arbitrary command using grunt-exec
    exec: { 
      run: {
        command: 'node static_server2.js',
        stdout: true
      },
      debug: {
        command : 'node --debug static_server2.js',
        stdout: true
      },
      inspector: {
        command: 'node-inspector &',
        stdout: true
      }
    }

  });

  // grunt plugins
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-doccoh');
  grunt.loadNpmTasks('grunt-clean');

  // Default task.
  grunt.registerTask('default', 'clean lint test doccoh');


};