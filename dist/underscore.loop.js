(function() {
  /*
  Copyright (c) 2011 Paul Harper
  underscore.loop version 0.0.1
  
  MIT Licensed. Use as you will.
  */
  var RecursiveCall, flatStackLoop, _;
  var __slice = Array.prototype.slice;
  try {
    _ = require('underscore');
  } catch (_e) {}
  RecursiveCall = (function() {
    function RecursiveCall(fn, args) {
      this.fn = fn;
      this.args = args;
    }
    RecursiveCall.prototype.call = function() {
      return this.fn.apply(null, this.args);
    };
    return RecursiveCall;
  })();
  flatStackLoop = function(rcall) {
    var fn;
    fn = rcall.fn;
    fn.recursing = true;
    while (rcall instanceof RecursiveCall) {
      rcall = rcall.call();
    }
    fn.recursing = false;
    return rcall;
  };
  _.mixin({
    loop: function(scope, args, fn) {
      var ret, _ref, _ref2;
      switch (arguments.length) {
        case 2:
          _ref = [args, scope, {}], fn = _ref[0], args = _ref[1], scope = _ref[2];
          break;
        case 1:
          _ref2 = [scope, [], {}], fn = _ref2[0], args = _ref2[1], scope = _ref2[2];
      }
      scope.loop = _(_.recurse).bind(null, _(fn).bind(scope));
      ret = scope.loop.apply(scope, args);
      delete scope.loop;
      return ret;
    },
    recurse: (function() {
      var r;
      r = function() {
        var args, fn, rcall;
        fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        rcall = new RecursiveCall(fn, args);
        if (fn.recursing) {
          return rcall;
        } else {
          return flatStackLoop(rcall);
        }
      };
      r.force = function(fn) {
        fn.recursing = false;
        return r.apply(null, arguments);
      };
      return r;
    })()
  });
}).call(this);
