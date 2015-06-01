module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/libs/angular/angular.js',
      'app/libs/angular-route/angular-route.js',
      'app/libs/angular-resource/angular-resource.js',
      'app/libs/angular-mocks/angular-mocks.js',
      'app/javascript/*.js',
      'app/tests/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
