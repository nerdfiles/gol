var Random = require('random-js')
var random = new Random(Random.engines.mt19937().autoSeed())

function generator(scene) {
  scene.g = []
  for (var i = 0; i < scene.x.length; ++i) {
    var _q = p()
    scene.g[i] = []
    var o = {}
    o[_q] = []
    scene.g[i].push(o)
    for (var j = 0; j < scene.y.length; ++j) {
      let _p = p()
      scene.g[i][0][j] = _p
      if (scene.g[i-1] && scene.g[i+1])
        scene.g[i-1] = scene.g[i+1]
    }
  }
  return scene
}

function p() {
  var id = random.integer(1, 10000)
  var lim = 3
  return Math.abs((1-id)/lim)
}

module.exports = exports = generator
