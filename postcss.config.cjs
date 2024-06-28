const excludes = ['node_modules/vant'];

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    //px转rem
    /*'postcss-pxtorem': {
      rootValue({file}) {
        let bool = false
        excludes.forEach(tar => {
          if (file.includes(tar)) bool = true
        })
        return bool ? 37.5 : 75;
      },
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['.ignore', 'keep-px'],
      minPixelValue: 1,
      mediaQuery: false,
    },*/
    //px转vw
    'postcss-px-to-viewport-8-plugin': {
      unitToConvert: 'px',
      unitPrecision: 3,
      propList: [
        '*' //  '!font-size'
      ],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore', 'keep-px'],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/node_modules/],
      include: [/src/],
      viewportWidth(file) {
        return excludes.some((tar) => file.includes(tar));
      }
    }
  }
};
