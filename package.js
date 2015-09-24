
Package.describe({
  summary: 'Value Objects for monetary domains.',
  name: 'space:vo-monetary',
  version: '0.1.0',
  git: 'https://github.com/meteor-space/vo-monetary.git'
});

Package.onUse(function(api) {

  api.versionsFrom('METEOR@1.0');

  api.use([
    'check',
    'space:messaging@1.6.0'
  ]);

  api.add_files([
    'source/currency.js',
    'source/money.js',
  ]);

  api.export('Currency');
  api.export('Money');

});

Package.onTest(function(api) {

  api.use([
    'check',
    'space:vo-monetary',
    'practicalmeteor:munit@2.1.5',
    'space:testing@1.3.0',
  ]);

  api.add_files([
    'tests/currency.unit.js',
    'tests/money.unit.js',
  ]);

});
