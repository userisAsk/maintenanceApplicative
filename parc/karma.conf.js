  const process = require('process');

  module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-spec-reporter'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        clearContext: true,
        jasmine: {
          failSpecWithNoExpectations: true,
          random: true
        }
      },
      specReporter: {
        maxLogLines: 5,
        suppressErrorSummary: false,
        suppressFailed: false,
        suppressPassed: false,
        suppressSkipped: false,
        showSpecTiming: true
      },
      reporters: ['spec'],
      browsers: ['Chrome'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      singleRun: true,
      failOnEmptyTestSuite: false,
      browserNoActivityTimeout: 40000,
      disconnectTolerance: 3,
      processKillTimeout: 10000
    });
  };