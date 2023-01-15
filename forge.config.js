module.exports = {
  packagerConfig: {
    asar: true
  },
  plugins: [
   {
     name: '@electron-forge/plugin-auto-unpack-natives',
     config: {}
   }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Alsarmad',
          name: 'almujaz'
        },
        prerelease: true
      }
    }
  ],
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
