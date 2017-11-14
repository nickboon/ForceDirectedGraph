(function(app) {
    app.createForceDirectedGraphSolidsObject = function(defaultSetUp) {
        function createTree(nodes, edges, setup) {
            var createLabel = app.primitives.createLabel,
                createBranch = app.createForceDirectedShapesObject().createBranch,
                primitives = [],
                points = [],
                key,
                nodeA,
                nodeB,
                label,
                branch;

            //labels
            for (key in nodes) {
                if (nodes.hasOwnProperty(key)) {
                    nodeA = nodes[key];
                    label = createLabel(nodeA.text, nodeA.centre, nodeA.colour, undefined, undefined, true);
                    primitives.push(label);
                    points.push(nodeA.centre);
                }
            }

            // branches
            edges.forEach(function(edge) {
                nodeA = nodes[edge.nodeA];
                nodeB = nodes[edge.nodeB];
                branch = createBranch(nodeA, nodeB);
                primitives.push(branch);
            });

            setup = setup || defaultSetUp;
            setup(nodes);

            return {
                points: points,
                primitives: primitives
            };
        }

        return {
            createTree: createTree
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));