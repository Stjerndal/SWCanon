angular.module('starter.filters', [])

.filter('abs', function () {
  return function(val) {
    return Math.abs(val);
  }
})


.filter('mediaTypesFilter', function () {
    return function (mediaItems, mediaTypes) {
        var items = {
            types: mediaTypes,
            out: []
        };
        angular.forEach(mediaItems, function (value, key) {
            if (this.types[value.type] === true) {
                this.out.push(value);
            }
        }, items);
        return items.out;
    };
})