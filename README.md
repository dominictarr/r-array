# r-array

Replicated Array 

<img src=https://secure.travis-ci.org/dominictarr/r-array.png?branch=master>

(via [scuttlebutt](https://npm.im/scuttlebutt))

## example

``` js

var RArray = require('r-array')

var a = new RArray()
var b = new RArray()
var s;

//pipe instances together...
(s =a.createStream())
  .pipe(b.createStream())
  .pipe(s)

//see https://github.com/dominictarr/scuttlebutt

a.splice(0, 0, 'A', 'B', 'C', 'D')

process.nextTick(function () {
  console.log(b.toJSON())
})


```

## License

MIT
