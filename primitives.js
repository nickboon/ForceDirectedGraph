(function(app) {
    var colours = app.createColourObject(),
        isNotAPoint = app.createPointsObject().isNotAPoint,
        defaultBranchRadius = 10,
        CIRCLE_ARC = 2 * Math.PI;

    app.createForceDirectedShapesObject = function() {
        function createBranch(nodeA, nodeB, r) {
            var pointA = nodeA.centre,
                pointB = nodeB.centre,
                colour = nodeA.colour,
                radius = r || defaultBranchRadius;

            if (isNotAPoint(pointA) || isNotAPoint(pointB)) {
                throw "You need at least 2 defined vertices for a line.";
            }

            return {
                points: [pointA, pointB],

                getNearestZ: function() {
                    return Math.min(pointA.z, pointB.z);
                },

                draw: function(context, perspective, alpha) {
                    var screenX = perspective.getScreenX,
                        screenY = perspective.getScreenY,
                        pointAScreenX = screenX(pointA),
                        pointAScreenY = screenY(pointA),
                        pointBScreenX = screenX(pointB),
                        pointBScreenY = screenY(pointB),

                        opposite = pointAScreenX - pointBScreenX,
                        adjacent = pointAScreenY - pointBScreenY,
                        hypotenuse = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent, 2)),

                        scale = perspective.getScale(pointB),
                        screenRadius = radius * scale,
                        ratio = screenRadius / hypotenuse,
                        pointOnPerimeterX = pointBScreenX + opposite * ratio,
                        pointOnPerimeterY = pointBScreenY + adjacent * ratio;

                    context.save();
                    context.strokeStyle = colours.toRgb(colour, alpha);

                    // line
                    context.beginPath();
                    context.moveTo(pointAScreenX, pointAScreenY);
                    context.lineTo(pointOnPerimeterX, pointOnPerimeterY);
                    context.closePath();
                    context.stroke();

                    // circle
                    context.beginPath();
                    context.arc(pointBScreenX, pointBScreenY, screenRadius, 0, CIRCLE_ARC);
                    context.closePath();
                    context.stroke();

                    context.restore();
                }
            };
        }

        return {
            createBranch: createBranch
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));