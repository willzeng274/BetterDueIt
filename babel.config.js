module.exports = function (api) {
  api.cache(true);
  
  return {
    // images: {
    //   disableStaticImages: true
    // },
    presets: ['babel-preset-expo']
  };
};
