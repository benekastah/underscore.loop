###
Copyright (c) 2011 Paul Harper
underscore.loop version 0.0.2

MIT Licensed. Use as you will.
###

global = if global? then global else window

try global._ ?= require 'underscore'

class RecursiveCall
  constructor: (@fn, @args) ->
  call: -> @fn.apply null, @args

flatStackLoop = (rcall) ->
  {fn} = rcall
  fn.recursing = true
  while rcall instanceof RecursiveCall
    rcall = rcall.call()
  fn.recursing = false
  rcall

_.mixin
  loop: (scope, args, fn) ->
    switch arguments.length
      when 2 then [fn, args, scope] = [args, scope, {}]
      when 1 then [fn, args, scope] = [scope, [], {}]
    scope.loop = _( _.recurse ).bind null, _(fn).bind scope 
    ret = scope.loop args...
    delete scope.loop
    ret
    
  recurse: do ->
    r = (fn, args...) ->
      rcall = new RecursiveCall fn, args
      if fn.recursing then rcall
      else flatStackLoop rcall
    r.force = (fn) ->
      fn.recursing = false
      r arguments...
    r