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

## Widget

There is a simple widget provided for rendering the `r-array` to real time html.
`widget` takes an `RArray` instance, and a template function
(a function that accepts a value and returns a `HTMLElement`)

If you do not provide a template, RArray will render the JSON value of each item.
``` js
var widget = require('r-array/widget')
var a = new RArray()

document.body.appendChild(
  widget(a, function (value) {
    var pre = document.createElement('pre')
    pre.innerText = JSON.stringify(value)
    return pre
  })
)
```


## License

MIT
