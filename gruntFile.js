module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        mockjsonapi: {
            options: {
                jsonStore: 'test/data/data.json',
                emptyJsonStore: true
            },
            apimocks: [
                'test/mocks/'
            ],
            apidocs: 'test/apidocs/'
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['mockjsonapi']);

};