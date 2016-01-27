
Package.describe({
  name: 'space:vo-monetary',
  summary: 'Value Objects for monetary domains.',
  version: '0.1.0',
  git: 'https://github.com/meteor-space/vo-monetary.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  api.versionsFrom('1.2.0.1');

  api.use([
    'check',
    'ecmascript',
    'space:base@4.1.0',
    'space:domain@0.1.0'
  ]);

  api.add_files([
    'source/currency.js',
    'source/money.js'
  ]);

  api.export('Currency');
  api.export('Money');

});

Package.onTest(function(api) {

  api.use([
    'check',
    'ejson',
    'ecmascript',
    'space:vo-monetary',
    'practicalmeteor:munit@2.1.5',
    'space:testing@3.0.1'
  ]);

  api.add_files([
    'tests/currency.unit.js',
    'tests/money.unit.js'
  ]);

});
