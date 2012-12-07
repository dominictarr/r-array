require('tape')('test', function (t) {
var RArray = require('..')

var a = new RArray()
var b = new RArray()
var s;

//pipe instances together...
(s =a.createStream())
  .pipe(b.createStream())
  .pipe(s)

//see https://github.com/dominictarr/scuttlebutt

a.splice(0, 0, 'A', 'B', 'C', 'D')

b.push('hello!')
//  console.log(b.toJSON())

process.nextTick(function () {
  console.log('a', a.store, a.keys)
  console.log(a.toJSON())
  console.log('b', b.store, b.keys)
  console.log(b.toJSON())
  t.deepEqual(a.toJSON(), b.toJSON())
  t.end()
})


})

