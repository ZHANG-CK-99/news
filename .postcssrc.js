// postcss.config.js
// module.exports = {
//   plugins: {
//     'postcss-pxtorem': {
//       rootValue: 37.5,
//       propList: ['*']
//     }
//   }
// }

const pxToRem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxToRem({
      rootValue: ({ file }) => {
        return /vant/.test(file) ? 37.5 : 75
      }, //根节点字体的大小
      propList: ['*'] //所有的属性都转化成rem
    })
  ]
}
