
var RArray = require('./')

var a = new RArray()
var b = new RArray()
var s

//pipe instances together...
;(s = a.createStream())
  .pipe(b.createStream())
  .pipe(s)

//see https://github.com/dominictarr/scuttlebutt

b.splice(0, 0, 'A', 'B', 'C', 'D')
a.push('zzzz')

process.nextTick(function () {
  console.log('A', b.toJSON())
  console.log('B', b.toJSON())
})


