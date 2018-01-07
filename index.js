var scene = require('./scene')()
var generator = require('./generator')
var gen = require('color-generator')
var _ = require('lodash')
var fs = require('fs')
var randomColor = require('randomcolor')

scene.init().then((s) => {

  var g = generator(s)
  var i = 0
  var l = []
  var _d = []

  function compile(total) {
    _d.push(['<table>'])
    for (var k = 0; k < total; ++k) {
      g.g.forEach(function(j) {
        var obj = {}
        j.forEach(function(e) {
          obj.x = i
          i++
          _.each(e, function(z) {
            if (_.isNumber(z))
              obj.y = z
          })
        })
        l.push(obj)

        l.forEach(function(b) {

          var green = randomColor({
            count: 1,
            hue: 'green'
          })

          var red = randomColor({
            count: 1,
            luminosity: 'light',
            hue: 'red'
          })

          if (parseFloat(b.y) > (10000/4)) {
            // b.bg = gen().hexString()
            b.bg = red
          } else {
            // b.bg = gen(0.8, 0.25).hexString()
            b.bg = green
          }
        })
      })

      // console.log(l)
      var d = l
      var rows = _.map(d, function(v) {
        return [
          '<tr style="background-color: ' + v.bg + '">',
            '<td>' + v.y + '</td>',
            '</tr>'
        ].join('')
      })
      _d.push(rows)

    }

    _d.push('</table>')
  }

  compile(10)
  var css = '<style>tbody { display: flex; flex-wrap: wrap; }</style>'
  _d.push(css)

  fs.writeFile('./index.html', _d.join(''), function(e) {
    if (e)
      console.log(e)
  })
})

