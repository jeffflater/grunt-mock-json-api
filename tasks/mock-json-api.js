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

    grunt.config.merge({
        //jshint
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: []
        },
        //apidocs
        apidoc: {
            mocks: {}
        },
        //run
        run: {
            options: {
            },
            jasminenodekarma: {}
        }
    });

    grunt.registerMultiTask('mockjsonapi', 'Cleans, test, and generates api documentation for mock-json-api.', function() {

        switch (this.target) {
            case 'clean':
                var clean = grunt.config('mockjsonapi.clean');
                fs.writeFileSync(clean.jsonStore, '{}', 'utf8');
                break;
            case 'test':
                var test = grunt.config('mockjsonapi.test');

                grunt.config.set('jshint:all', test.mocks);
                grunt.config.set('run:jasminenodekarma', {
                    exec: 'jasmine-node-karma test/specs/test.spec.js --verbose'
                });

                grunt.task.run(['jshint', 'run']);
                break;
            case 'docs':
                var test = grunt.config('mockjsonapi.test');
                var docs = grunt.config('mockjsonapi.docs');

                grunt.config.set('apidoc:mocks', {
                    src: test.mocks,
                    dest: docs.publish
                });

                grunt.task.run(['apidoc']);
                break;
            default:
                grunt.log.writeln('not a valid option');
                break;
        }
    });
};