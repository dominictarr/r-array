
var between     = require('between')
var Scuttlebutt = require('scuttlebutt')
var inherits    = require('util').inherits
var filter      = require('scuttlebutt/util').filter

inherits(RArray, Scuttlebutt)

module.exports = RArray

var DOEMIT = true, CHANGE = {}

function RArray () {
  Scuttlebutt.call(this)
  this.keys = []
  this.store = {}
  this._history = []
  if(arguments.length) {
    var self = this
    ;[].forEach.call(arguments, function (e) {
      self.push(e)
    })
  }
}

var A = RArray.prototype

A.last = function () {
  var max = null
  for(var k in this.store)
    if(!max || max < k) max = k
  return max
}

A.first = function () {
  var min = null
  for(var k in this.store)
    if(!min || min < k) min = k
  return min
}

A.insert = function (before, val, after) {  
  var key = between(before || between.lo, after || between.hi)
  this.set(key, val)
  return key
}

A.push = function (val) {
  var key = this.insert(this.last(), val)
}

A.unshift = function (val) {
  var key = this.insert(null, val, this.first())
}

A.indexOf = function (val) {
  for(var k in this.store)
    if(v === this.store[k]) return this.store[k]
}

A.toJSON = function () {
  var store = this.store
  return this.keys.map(function (key) {
    return store[key]
  })
}

A.set = function (key, val) {
  if('string' == typeof key) {
    this.store[key] = val
    if(!~this.keys.indexOf(key)) {
      this.keys.push(key)
      this.keys.sort()
    }
    CHANGE[key] = val
    DOEMIT && this._emit()
  }
}

A.unset = function (key) {
  if('string' == typeof key) {
    delete this.store[key]
    var i = this.keys.indexOf(key)
    this.keys.splice(i, 1)    

    CHANGE[key] = null
    DOEMIT && this._emit()
  }
}

A._emit = function () {
  if(!DOEMIT) return
  this.localUpdate(CHANGE)
  CHANGE = {}
}

A.splice = function (i, d /*,...args*/) {
  var args = [].slice.call(arguments, 2)
  var j = 0, l = args.length

  DOEMIT = false

  if(d + i > this.keys.length)
    d = this.keys.length - i
  
  while(j < d) {
    if(j < l)
      this.set(this.keys[i+j], args[j]), j++
    else
      this.unset(this.keys[i+j]), d--
  }

  while(j < l)
    this.insert(this.keys[i+j-1], args[j], this.keys[i+j]), j++

  DOEMIT = true
  this._emit()
}

A.applyUpdate = function (update) {
  this._history.push(update)
  return true
}

A.history = function (sources) {
  //TODO, filter by source...
  //pull the thing from scuttlebutt/model
  return filter(this._history, sources)
}
