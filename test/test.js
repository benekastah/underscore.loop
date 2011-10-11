(function (_) {
  
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

  function alphabetize(a, b) {
    return _.loop( [ a.toString().split(''), b.toString().split('') ], function (a, b) {
      var firstA = (_.first(a) || '').charCodeAt(0),
          firstB = (_.first(b) || '').charCodeAt(0) || -Infinity;
      if ((_.isEmpty(a) && _.isEmpty(b)) || firstA < firstB) return true;
      else if (firstB < firstA) return false;
      else return this.loop(_.rest(a), _.rest(b));
    });
  }
  
  console.log(qsort([24,5,63,2,4,52,5,67,4,325,34523,234,534,2,3,5,73,43,
    52,6,34,5,34,90896,65,7,3,585,56790,987]));
  console.log(qsort([
    "ad-man",
    "aardvark",
    "ad",
    "avert",
    "benion",
    "robust",
    "scram",
    "scrape",
    "scoot",
    "scooter",
    "a-hole"
  ], alphabetize));
  
})(require("underscore"));