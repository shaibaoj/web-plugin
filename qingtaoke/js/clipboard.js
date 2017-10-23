!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define("clipboard",a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.Clipboard=a()}}(function(){var a;return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(require,module,exports){function a(a,c){for(;a&&a.nodeType!==b;){if(a.matches(c))return a;a=a.parentNode}}var b=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var c=Element.prototype;c.matches=c.matchesSelector||c.mozMatchesSelector||c.msMatchesSelector||c.oMatchesSelector||c.webkitMatchesSelector}module.exports=a},{}],2:[function(require,module,exports){function a(a,c,d,e,f){var g=b.apply(this,arguments);return a.addEventListener(d,g,f),{destroy:function(){a.removeEventListener(d,g,f)}}}function b(a,b,d,e){return function(d){d.delegateTarget=c(d.target,b),d.delegateTarget&&e.call(a,d)}}var c=require("./closest");module.exports=a},{"./closest":1}],3:[function(require,module,exports){exports.node=function(a){return void 0!==a&&a instanceof HTMLElement&&1===a.nodeType},exports.nodeList=function(a){var b=Object.prototype.toString.call(a);return void 0!==a&&("[object NodeList]"===b||"[object HTMLCollection]"===b)&&"length"in a&&(0===a.length||exports.node(a[0]))},exports.string=function(a){return"string"==typeof a||a instanceof String},exports.fn=function(a){return"[object Function]"===Object.prototype.toString.call(a)}},{}],4:[function(require,module,exports){function a(a,f,g){if(!a&&!f&&!g)throw new Error("Missing required arguments");if(!e.string(f))throw new TypeError("Second argument must be a String");if(!e.fn(g))throw new TypeError("Third argument must be a Function");if(e.node(a))return b(a,f,g);if(e.nodeList(a))return c(a,f,g);if(e.string(a))return d(a,f,g);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function b(a,b,c){return a.addEventListener(b,c),{destroy:function(){a.removeEventListener(b,c)}}}function c(a,b,c){return Array.prototype.forEach.call(a,function(a){a.addEventListener(b,c)}),{destroy:function(){Array.prototype.forEach.call(a,function(a){a.removeEventListener(b,c)})}}}function d(a,b,c){return f(document.body,a,b,c)}var e=require("./is"),f=require("delegate");module.exports=a},{"./is":3,delegate:2}],5:[function(require,module,exports){function a(a){var b;if("SELECT"===a.nodeName)a.focus(),b=a.value;else if("INPUT"===a.nodeName||"TEXTAREA"===a.nodeName){var c=a.hasAttribute("readonly");c||a.setAttribute("readonly",""),a.select(),a.setSelectionRange(0,a.value.length),c||a.removeAttribute("readonly"),b=a.value}else{a.hasAttribute("contenteditable")&&a.focus();var d=window.getSelection(),e=document.createRange();e.selectNodeContents(a),d.removeAllRanges(),d.addRange(e),b=d.toString()}return b}module.exports=a},{}],6:[function(require,module,exports){function a(){}a.prototype={on:function(a,b,c){var d=this.e||(this.e={});return(d[a]||(d[a]=[])).push({fn:b,ctx:c}),this},once:function(a,b,c){function d(){e.off(a,d),b.apply(c,arguments)}var e=this;return d._=b,this.on(a,d,c)},emit:function(a){var b=[].slice.call(arguments,1),c=((this.e||(this.e={}))[a]||[]).slice(),d=0,e=c.length;for(d;d<e;d++)c[d].fn.apply(c[d].ctx,b);return this},off:function(a,b){var c=this.e||(this.e={}),d=c[a],e=[];if(d&&b)for(var f=0,g=d.length;f<g;f++)d[f].fn!==b&&d[f].fn._!==b&&e.push(d[f]);return e.length?c[a]=e:delete c[a],this}},module.exports=a},{}],7:[function(require,module,exports){!function(b,c){if("function"==typeof a&&a.amd)a(["module","select"],c);else if(void 0!==exports)c(module,require("select"));else{var d={exports:{}};c(d,b.select),b.clipboardAction=d.exports}}(this,function(module,a){"use strict";function b(a){return a&&a.__esModule?a:{default:a}}function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d=b(a),e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=function(){function a(b){c(this,a),this.resolveOptions(b),this.initSelection()}return f(a,[{key:"resolveOptions",value:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=a.action,this.emitter=a.emitter,this.target=a.target,this.text=a.text,this.trigger=a.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var a=this,b="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return a.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[b?"right":"left"]="-9999px";var c=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=c+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,d.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,d.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var a=void 0;try{a=document.execCommand(this.action)}catch(b){a=!1}this.handleResult(a)}},{key:"handleResult",value:function(a){this.emitter.emit(a?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=a,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(a){if(void 0!==a){if(!a||"object"!==(void 0===a?"undefined":e(a))||1!==a.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&a.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(a.hasAttribute("readonly")||a.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=a}},get:function(){return this._target}}]),a}();module.exports=g})},{select:5}],8:[function(require,module,exports){!function(b,c){if("function"==typeof a&&a.amd)a(["module","./clipboard-action","tiny-emitter","good-listener"],c);else if(void 0!==exports)c(module,require("./clipboard-action"),require("tiny-emitter"),require("good-listener"));else{var d={exports:{}};c(d,b.clipboardAction,b.tinyEmitter,b.goodListener),b.clipboard=d.exports}}(this,function(module,a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function h(a,b){var c="data-clipboard-"+a;if(b.hasAttribute(c))return b.getAttribute(c)}var i=d(a),j=d(b),k=d(c),l=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),m=function(a){function b(a,c){e(this,b);var d=f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this));return d.resolveOptions(c),d.listenClick(a),d}return g(b,a),l(b,[{key:"resolveOptions",value:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof a.action?a.action:this.defaultAction,this.target="function"==typeof a.target?a.target:this.defaultTarget,this.text="function"==typeof a.text?a.text:this.defaultText}},{key:"listenClick",value:function(a){var b=this;this.listener=(0,k.default)(a,"click",function(a){return b.onClick(a)})}},{key:"onClick",value:function(a){var b=a.delegateTarget||a.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new i.default({action:this.action(b),target:this.target(b),text:this.text(b),trigger:b,emitter:this})}},{key:"defaultAction",value:function(a){return h("action",a)}},{key:"defaultTarget",value:function(a){var b=h("target",a);if(b)return document.querySelector(b)}},{key:"defaultText",value:function(a){return h("text",a)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],b="string"==typeof a?[a]:a,c=!!document.queryCommandSupported;return b.forEach(function(a){c=c&&!!document.queryCommandSupported(a)}),c}}]),b}(j.default);module.exports=m})},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)});