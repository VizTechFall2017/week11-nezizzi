var height = 700;
var width = 1350;

var padding = { "top": 100,
                "right": 100,
                "bottom": 100,
                "left": 100 };

// creating svg canvas
var svg = d3.select(".svg-container")
              .append("svg")
              .attr("height", height)
              .attr("width", width)
              .append("g")
              .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

// creating scales and range
scaleY = d3.scaleLinear()
            .range([0, height - padding.top - padding.bottom])
            .nice(); // making scale end in round number

scaleX = d3.scaleLinear()
            .range([0, width - padding.right - padding.left])
            .nice();

// defining the pattern
// for further options, see https://riccardoscalco.github.io/textures/
var t = textures.lines()
          .orientation("7/8", "7/8")
          .size(10)
          .strokeWidth(.25)
          .stroke("#1F5869");

svg.call(t); // calling pattern in the svg context

d3.csv("./daca_approvals.csv", function(error, loadData) {
    if (error) { throw error };

    // parsing for number output
    loadData.forEach(function(d){
        d.x = +d.x;
        d.y = +d.y;
    });

    //setting up domains
    scaleX.domain([0,20]);
    scaleY.domain([20,0]);

    // calling axis
    xAxis(scaleX);
    yAxis(scaleY);

    // calling area + line function, function takes 2 arguments: the dataset and the fill of the area.
    draw(loadData, t.url());

    // calling title, subtitle and axis labels
    chartTitle();
    chartSubtitle();
    xLabel();
    yLabel();

});

function draw(dataset, fill) {

     var line = d3.line()
                 .curve(d3.curveBasis)
                 .x(function(d) { return scaleX(d.x) })
                 .y(function(d) { return scaleY(d.y) })


     var appendLine = svg.append("g")
                       .append("path")
                       .data([dataset])
                       .attr("fill", "none")
                       .attr("stroke", "black")
                       .attr("stroke-width", 1)
                       .attr("stroke-dasharray", [.5,1])
                       .attr("d", line);

      var area = d3.area()
                     .curve(d3.curveBasis)
                     .x0(function(d) { return scaleX(d.x) - 100})
                     .x1(function(d) { return scaleX(d.x) + 100 })
                     .y(function(d) { return scaleY(d.y) })
                     // .y1(function(d) { return scaleY(d.initial_cumulative) });

      var appendArea = svg.append("g")
                            .append("path")
                            .data([dataset])
                            .attr("class", "area")
                            .attr("fill", fill)
                            .attr("opacity", 1)
                            .attr("d", area);
};

// defining functions to append axis
function xAxis(scale) {
          svg.append("g")
              .attr("transform", "translate(0,500)" )
              .attr("class", "xAxis")
              .call(d3.axisBottom(scale));
};

function yAxis(scale) {

          svg.append("g")
              .attr("transform", "translate(0,0)")
              .attr("class", "yAxis")
              .call(d3.axisLeft(scale));
};

// defining functions to append title, subtitle and labels to axis
function chartTitle() {
          svg.append("text")
               .attr("x", 0)
               .attr("y", -50)
               .attr("class", "title")
               .text("Title");
};

function chartSubtitle() {
          svg.append("text")
               .attr("x", 0)
               .attr("y", -25)
               .attr("class", "subtitle")
               .text("Subtitle");
};

function xLabel() {
          svg.append("text")
              .attr("x", 300)
              .attr("y", 440)
              .attr("class", "label")
              .attr("text-anchor", "middle")
              .text("X axis Label");
};

function yLabel() {
          svg.append("text")
               .attr("transform", "rotate(270)")
               .attr("x", -100)
               .attr("y", -70)
               .attr("class", "label")
               .attr("text-anchor", "middle")
               .text("Y axis Label");
};
