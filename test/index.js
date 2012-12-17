var test = require('tape')

var RArray = require('..')

test('empty.toJSON()', function (t) {
  var a = new RArray()
  t.deepEqual(a.toJSON(), [])
  t.end()
})

test('push', function (t) {
  var a = new RArray(), called = 0
  a.on('update', function (apply) {
    called ++
  })
  a.push('a')
  t.deepEqual(a.toJSON(), ['a'])
  t.equal(called, 1)
  a.push('b')
  t.deepEqual(a.toJSON(), ['a', 'b'])
  t.equal(called, 2)
  t.equal(a.length, 2)
  t.end()
})

test('pop', function (t) {

  var a = new RArray(), called = 0
  a.on('update', function (apply) {
    called ++
  })
  a.push('a')
  t.deepEqual(a.toJSON(), ['a'])
  t.equal(a.pop(), 'a')
  t.equal(called, 2)
  a.push('a')
  a.push('b')
  t.deepEqual(a.toJSON(), ['a', 'b'])
  t.equal(a.pop(), 'b')
  t.equal(called, 5)
  console.log(a.toJSON())
  t.equal(a.length, 1)
  t.end()
  

})

test('unshift', function (t) {
  var a = new RArray()
  a.unshift('a')
  t.deepEqual(a.toJSON(), ['a'])
  a.unshift('b')
  t.deepEqual(a.toJSON(), ['b', 'a'])
  t.equal(a.length, 2)
  t.end()
})

test('shift', function (t) {
  var a = new RArray()
  a.unshift('a')
  t.deepEqual(a.toJSON(), ['a'])
  t.equal('a', a.shift())
  a.unshift('b')
  a.unshift('x')
  t.deepEqual(a.toJSON(), ['x', 'b'])
  var x = a.shift()
  t.equal(x, 'x')
  t.equal(a.length, 1)

  t.end()
})


test('splice', function (t) {
  var a = new RArray('a', 'b')
  t.deepEqual(a.toJSON(), ['a', 'b'])

  a.splice(1, 1, 'B')
  t.deepEqual(a.toJSON(), ['a', 'B'])

  a.splice(1, 0, '?')
  t.deepEqual(a.toJSON(), ['a','?', 'B'])

  a.splice(0, 2)
  t.deepEqual(a.toJSON(), ['B'])

  a.splice(0, 6, 'x', 'y', 'z')
  t.deepEqual(a.toJSON(), ['x', 'y', 'z'])
  t.equal(a.length, 3)

  t.end()
})
