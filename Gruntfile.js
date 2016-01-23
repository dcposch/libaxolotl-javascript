'use strict'

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-mocha-test') // For server-side testing
  grunt.loadNpmTasks('grunt-blanket')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-concat')

  grunt.initConfig({
    clean: {
      all: {
        src: ['coverage/', 'dist/', 'build/']
      }
    },
    copy: {
      coverage: {
        src: ['build/test/**'],
        dest: 'coverage/'
      }
    },
    blanket: {
      all: {
        src: 'build/src/',
        dest: 'coverage/build/src/'
      }
    },
    mochaTest: {
      unitTests: {
        src: ['test/unit/**/*.js']
      },
      integrationTests: {
        src: ['test/integration/node/**/*.js'],
        options: {
          clearRequireCache: true
        }
      },
      coverage: {
        src: ['coverage/build/test/unit/**/*.js'],
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage/index.html',
          clearRequireCache: true
        }
      }
    }
  })

  grunt.registerTask('coverage', ['copy:coverage', 'blanket', 'mochaTest:coverage'])

  grunt.registerTask('test', ['clean', 'mochaTest:unitTests'])
  grunt.registerTask('default', ['test'])
  grunt.registerTask('dist', ['default', 'concat'])
  grunt.registerTask('integration-test', ['dist', 'mochaTest:integrationTests'])
}
