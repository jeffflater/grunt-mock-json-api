/**
 * Created by flaterje on 7/28/2014.
 */

'use strict';

module.exports = function(grunt) {

    var fs = require('fs');
    require('rootpath')();

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-apidoc');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerMultiTask('mockjsonapi', 'Cleans, test, and generates api documentation for mock-json-api.', function() {

        switch (this.target) {
            case 'clean':
                var clean = grunt.config('mockjsonapi.clean');
                fs.writeFileSync(clean.jsonStore, '{}', 'utf8');
                break;

            case 'test':
                var test = grunt.config('mockjsonapi.test');
                var testConfig = {
                    jshint: {
                        options: {
                            reporter: require('jshint-stylish')
                        },
                        all: test.mocks
                    },
                    run: {
                        options: {
                        },
                        jasminenodekarma: {
                            exec: 'jasmine-node-karma test/specs/test.spec.js --verbose'
                        }
                    }
                };
                grunt.config.merge(testConfig);
                grunt.task.run(['jshint', 'run']);
                break;

            case 'docs':
                var test = grunt.config('mockjsonapi.test');
                var docs = grunt.config('mockjsonapi.docs');

                var docsConfig = {
                    apidoc: {
                        mocks: {
                            src: test.mocks,
                            dest: docs.publish
                        }
                    }
                };
                grunt.config.merge(docsConfig);
                grunt.task.run(['apidoc']);
                break;

            default:
                grunt.log.writeln('not a valid option');
                break;
        }
    });
};