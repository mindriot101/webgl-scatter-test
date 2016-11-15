var $ = require('jquery');
var fit = require('canvas-fit');
var createPlot = require('gl-plot2d');
var createScatter = require('gl-scatter2d');
var mouseChange = require('mouse-change')


function positionsFromData(data) {
    var positions = new Float32Array(2 * data[0].length);
    for (var i=0; i<data[0].length; i++) {
        positions[i * 2] = data[0][i];
        positions[i * 2 + 1] = data[1][i];
    }
    return positions;
}

function minOfArray(arr) {
    return Math.min.apply(null, arr);
}

function maxOfArray(arr) {
    return Math.max.apply(null, arr);
}

$(document).ready(function() {
    $.getJSON("/data", function(data, status, jqXHR) {
        var nights = data.nights;
        var data = data.data;
        console.log(nights);
        var canvas = document.getElementById("plotcanvas");
        window.addEventListener('resize', fit(canvas, null, +window.devicePixelRatio), false)

        var gl = canvas.getContext('webgl');

        var dataBox = [minOfArray(data[0]), 0.1,
            maxOfArray(data[0]), 0.6];

        var xtick_gap = (dataBox[2] - dataBox[0]) / 10;
        var ytick_gap = (dataBox[3] - dataBox[1]) / 10;

        var xticks = nights.map(function(row) { return { x: row[0], text: row[1] }; });
        var yticks = [];
        for (var i=dataBox[1]; i<dataBox[3]; i+=ytick_gap) {
            yticks.push({
                x: i,
                text: i.toPrecision(1),
            });
        }


        var options = {
            gl: gl,
            pixelRatio: +window.devicePixelRatio,
            ticks: [xticks, yticks],
            tickEnable: [true, true, false, false],
            tickAngle: [45, 0, 0, 0],
            tickPad: [25, 15, 15, 15],
            borderLineEnable: [false, false, false, false],
            titleEnable: false,
            dataBox: dataBox,
            labels: ['Image', 'STDCRMS'],
        };

        var plot = createPlot(options);
        var scatter = createScatter(plot, {
            positions: new Float32Array(),
            size: 1,
        });

        function render() {
            requestAnimationFrame(render);
            plot.draw();
        }

        var new_positions = positionsFromData(data);

        scatter.update({
            size: 1,
            positions: new_positions,
            borderSize: 0,
            color: [0, 0, 0, 1],
        });
        render();
    });
});
