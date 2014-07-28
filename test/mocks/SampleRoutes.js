/**
 * Created by flaterje on 7/28/2014.
 */
/**
 * @api {get} /SampleRoutes/Test1 Test1
 * @apiName Test1
 * @apiGroup SampleRoutes
 */
var Test1 = {
    name: 'Test1',
    mockRoute: '/SampleRoutes/Test1',
    testScope: 'success',
    testScenario: 0,
    jsonTemplate: [function () {
        return '{' +
            '"id":"123456"' +
            '}';
    }]
};