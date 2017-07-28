module.exports = function (shipit) {
  shipit.initConfig({
    default: {
      workspace: '/tmp/shipit-workspace',
      deployTo: '/var/www',
      repositoryUrl: 'https://github.com/bykof/billomat-document-change-tracker-frontend.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      key: '~/.ssh/id_rsa',
      keepReleases: 2,
      shallowClone: true
    },
    staging: {
      servers: '35.190.196.235'
    }
  });
  
  shipit.blTask('build', function () {
    return shipit.local('yarn build');
  });
  
  shipit.blTask('move', function () {
    return shipit.remoteCopy('./build/', '/var/www/frontend');
  });
  
  shipit.task('deploy', function () {
    shipit.start('build');
    shipit.start('move');
  });
};