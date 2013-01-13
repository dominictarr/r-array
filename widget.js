
module.exports = function (rarry, template) {

  var root = document.createElement('div')
  template = template || function (val, key, el) {
    function pre (val) { return '<pre>'+JSON.stringify(val)+'</pre>' }
    if(el)
      return el.innerHTML = pre(val), el
    var el = document.createElement('span')
    el.innerHTML = pre(val)
    return el
  }

  console.log(template)

  var elements = {}

  rarry.on('update', function (change) {
    for(var id in change)
      update(id, change[id])
  })

  function update (key, change) {
    var el
    if(el = elements[key]) {
      if(change == null) {
        return root.removeChild(el)
      }

      var _el = template.call(el, change, key, el)
      if(_el != el) {
        elements[key] = _el
        div.replaceChild(_el, el)
      }
      //else, template updated el.
      return
    }
    el = template.call(null, change, key)
      console.log(el)
    //var rarry.indexOf(id)
    //insert before the element that is already there...
    var before = elements[rarry.keys[rarry.indexOfKey(key) + 1]]
    elements[key] = el
    if(before) {
      root.insertBefore(el, before)
    } else {
      root.appendChild(el)
    }
  }

  //render the current contents...
  rarry.keys.forEach(function (key) {
    update(key, rarry.get(key))
  })

  return root
}

