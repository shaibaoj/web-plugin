define("qtkmessage",["jquery","underscore","qtk","errorCode"],function(a,b,c,d){return function(){function e(){}return e.prototype.run=function(e,f){var g,h,i,j,k,l;return i=a.Deferred(),l=new c,g=e.api,k=e.param,b.isArray(k)||(k=[k]),g&&b.isFunction(l[g])?(j=l[g],h=j.apply(l,k),h.fail(function(a){return i.reject(a)}),h.done(function(a){return i.resolve(a)}),i):(i.reject({errorCode:d.ERROR_MESSAGE_API_NOT_FOUND,errorText:"\u672a\u627e\u5230\u6307\u5b9a\u7684API"}),i)},e}()});