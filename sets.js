(function(app) {
    app.createSetsObject = function() {
        return {
            forEachValueIn: function(set, doAction) {
                for (var key in set) {
                    if (set.hasOwnProperty(key)) {
                        doAction(set[key]);
                    }
                }
            },

            forEachKeyIn: function(set, doAction) {
                for (var key in set) {
                    if (set.hasOwnProperty(key)) {
                        doAction(key);
                    }
                }
            },

            forEachElementIn: function(set, doAction) {
                for (var key in set) {
                    if (set.hasOwnProperty(key)) {
                        doAction(key, set[key]);
                    }
                }
            },

            toArray: function(set) {
                var array = [];
                for (var key in set) {
                    if (set.hasOwnProperty(key)) {
                        array.push(set[key]);
                    }
                }
                return array;
            }
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));