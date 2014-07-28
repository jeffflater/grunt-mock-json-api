module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        mockjsonapi: {
            clean: {
                jsonStore: 'test/data/store.json'
            },
            test: {
                mocks: [
                    'test/mocks/'
                ]
            },
            docs: {
                publish: 'test/apidocs/'
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['mockjsonapi:clean', 'mockjsonapi:test', 'mockjsonapi:docs']);

};