#Underscore.loop

## API

There are two functions to know:

    1. `loop( [ [ scope ], args ], fn )`
        
        This function initiates a recursive loop. To enter the next iteration of the loop, use
        `return this.loop( ...args )`. Note that `this.loop` is a curried form of `recurse` described
        below, which means `this.loop` will occupy constant space in the stack. The arguments passed 
        in to `this.loop` are passed in as arguments to the looping function.
    
    2. `recurse( fn, [ ...args ] )`
        
        This function performs tail-call optimization on a recursive process. Note that this function
        call must be `return`ed (in tail position) from your process for it to work. When the process
        is finished, simply return any value (except a call to recurse).
        
## Example

Here is an implementation of the quicksort algorithm that demonstrates how these functions are used in
practice:

    function qsort(a, process) {
        if (a.length <= 1) return a;
        var pivot = _.first(a);
        if (!process) process = function (a, b) { return a <= b; };

        return _.loop( [ _.rest(a), [], [] ], function (a, less, greater) {
          if (_.isEmpty(a)) {
            return _.recurse(_.bind(qsort), less, process)
                    .concat(pivot, _.recurse(_.bind(qsort), greater, process));
          } else {
            var first = _.first(a), l, g;
            if (process(first, pivot)) l = less.concat(first);
            else g = greater.concat(first);
            return this.loop(_.rest(a), l || less, g || greater);
          }
        });
      }