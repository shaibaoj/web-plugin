define("cxbMessage",["jquery"],function(a){return function(){function b(a){this.age=a}return b.prototype.sayHello=function(){var b,c;return b=a.Deferred(),c=this.age,this.age<70?b.resolve("re_ok"+c):b.reject({errorCode:"cxbError",errorText:"\u672a\u627e\u5230\u6307\u5b9a\u7684API"}),b},b}()});