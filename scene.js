function scene() {
  function init() {
    var a = []
    var b = []
    a.length = 10
    b.length = 10
    return new Promise((resolve, reject) => {
      var r = {
        x: a,
        y: b
      }
      resolve(r)
    })
  }
  return {
    init: init
  }
}

module.exports = exports = scene
