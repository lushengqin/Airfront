// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var header = document.querySelectorAll('#header');
console.log(header);
var $linkWarp = $('.linkWarp');
var $last = $linkWarp.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
console.log(x);
console.log(xObject);
var hashMap = xObject || [{
  logo: 'j',
  url: 'https://www.jianshu.com/u/7f68f0334d18'
}, {
  logo: 'g',
  url: 'https://github.com/lushengqin'
}, {
  logo: 'c',
  url: 'https://www.iconfont.cn/'
}];

var remove = function remove(url) {
  return url.replace('http://', '').replace('https://', '').replace('wwww.', '').replace(/\/.*/, ''); //删除以/开头的后面所有内容  
};

var render = function render(x) {
  $linkWarp.find('li:not(.last)').remove(); //先删除之前的 再添加

  hashMap.forEach(function (node, index) {
    // console.log(index) //拿到页面数据的索引
    var $li = $("<li>\n         <a href=\"".concat(node.url, "\">\n            <div class=\"listBox\">\n               <div class=\"logo\">").concat(node.logo, "</div>\n               <div class=\"link\">").concat(remove(node.url), "</div>\n            </div>\n         </a>\n         <span class= 'close'>\n            <svg class=\"icon\" >\n               <use xlink:href=\"#icon-guanbi1\"></use>\n            </svg>\n         </span>\n      </li>")).insertBefore($last);
    $li.on('click', '.close', function () {
      // hashMap.splice(index, 1)
      console.log(hashMap);
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addBox').on('click', function () {
  var url = window.prompt('请输入你想要的网址');

  if (url.indexOf('http') !== 0) {
    //如果它不是http开头的
    url = 'https://' + url;
  }

  console.log(url);
  hashMap.push({
    logo: remove(url)[0],
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

$('#mainWarp').on('keypress', function (e) {
  // console.log(e.key) //找到用户按的是哪个键 
  var key = e.key; //相当于const key = key.e

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url); //
    }
  }
}); // window.onload = () =>{
//    function $(id){
//        return document.getElementById(id);
//    }//获取焦点
//    $("searchmain").onfocus = ()=>{
//        if($("searchmain").value == "请输入关键字~"){
//            $("searchmain").value = "";
//            $("searchmain").style.color = "#64afe0";
//        }
//    }
//    $("searchmain").onblur = ()=>{
//        if($("searchmain").value == ""){
//            $("searchmain").value = "请输入关键字~";
//            $("searchmain").style.color = "#ccc";
//        }
//    }
// }
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.64bd347d.js.map