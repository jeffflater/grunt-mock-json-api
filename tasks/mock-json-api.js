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
            all: grunt.config('mockjsonapi.apimocks')
        },
        //apidocs
        apidoc: {
            mocks: {
                src: grunt.config('mockjsonapi.apimocks'),
                dest: grunt.config('mockjsonapi.apidocs')
            }
        },
        //run
        run: {
            options: {

            },
            jasminenodekarma: {
                exec: 'jasmine-node-karma test/specs/test.spec.js --verbose'
            }
        }
    });

    grunt.registerMultiTask('mockjsonapi', 'Cleans, test, and generates api documentation for mock-json-api.', function() {
        var options = this.options({});

        if (options.emptyJsonStore) {
            fs.writeFileSync(options.jsonStore, '{}', 'utf8');
        }

        grunt.task.run(['jshint', 'run:jasminenodekarma', 'apidoc']);
    });
};