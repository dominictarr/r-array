var test = require('tape')

var RArray = require('..')

test('empty.toJSON()', function (t) {
  var a = new RArray()
  t.deepEqual(a.toJSON(), [])
  t.end()
})

test('push', function (t) {
  var a = new RArray()
  a.push('a')
  t.deepEqual(a.toJSON(), ['a'])
  a.push('b')
  t.deepEqual(a.toJSON(), ['a', 'b'])
  t.end()
})

test('pop', function (t) {

  var a = new RArray()
  a.push('a')
  t.deepEqual(a.toJSON(), ['a'])
  t.equal(a.pop(), 'a')
  a.push('a')
  a.push('b')
  t.deepEqual(a.toJSON(), ['a', 'b'])
  t.equal(a.pop(), 'b')
  t.end()
  

})

test('unshift', function (t) {
  var a = new RArray()
  a.unshift('a')
  t.deepEqual(a.toJSON(), ['a'])
  a.unshift('b')
  t.deepEqual(a.toJSON(), ['b', 'a'])
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

  t.end()
})
