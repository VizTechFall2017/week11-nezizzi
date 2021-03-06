var width = d3.select('svg').attr('width');
var height = d3.select('svg').attr('height');

var marginLeft = 100;
var marginTop = 100;

var nestedData = [];

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

//these are the size that the axes will be on the screen; set the domain values after the data loads.
var scaleX = d3.scaleBand().rangeRound([0, 600]).padding(0.1);
var scaleY = d3.scaleLinear().range([400, 0]);

var sortOrder = "decreasing";
var currentYear = 1987;

//import the data from the .csv file
d3.csv('./countryData_topten.csv', function(dataIn){

    nestedData = d3.nest()
        .key(function(d){return d.year})
        .entries(dataIn);

    var loadData = nestedData.filter(function(d){return d.key == '1987'})[0].values;

    loadData.sort(function(a,b){
        return b.totalPop-a.totalPop;
    });

    // Add the x Axis
    svg.append("g")
        .attr('class','xaxis')
        .attr('transform','translate(0,400)')  //move the x axis from the top of the y axis to the bottom
        .call(d3.axisBottom(scaleX));

    svg.append("g")
        .attr('class', 'yaxis')
        .call(d3.axisLeft(scaleY));


    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    drawPoints(loadData);

});

//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    scaleX.domain(pointData.map(function(d){return d.countryCode;}));
    scaleY.domain([0, d3.max(pointData.map(function(d){return +d.totalPop}))]);

    d3.selectAll('.xaxis')
        .call(d3.axisBottom(scaleX));

    d3.selectAll('.yaxis')
        .call(d3.axisLeft(scaleY));

    //select all bars in the DOM, and bind them to the new data
    var rects = svg.selectAll('.bars')
        .data(pointData, function(d){return d.countryCode;});

    //look to see if there are any old bars that don't have keys in the new data list, and remove them.
    rects.exit()
        .remove();

    //update the properties of the remaining bars (as before)
    rects
        .transition()
        .duration(200)
        .attr('x',function(d){
            return scaleX(d.countryCode);
        })
        .attr('y',function(d){
            return scaleY(d.totalPop);
        })
        .attr('width',function(d){
            return scaleX.bandwidth();
        })
        .attr('height',function(d){
            return 400 - scaleY(d.totalPop);  //400 is the beginning domain value of the y axis, set above
        });

    //add the enter() function to make bars for any new countries in the list, and set their properties
    rects
        .enter()
        .append('rect')
        .attr('class','bars')
        .attr('fill', "slategray")
        .attr('x',function(d){
            return scaleX(d.countryCode);
        })
        .attr('y',function(d){
            return scaleY(d.totalPop);
        })
        .attr('width',function(d){
            return scaleX.bandwidth();
        })
        .attr('height',function(d){
            return 400 - scaleY(d.totalPop);  //400 is the beginning domain value of the y axis, set above
        });

    //take out bars for any old countries that no longer exist
    //rects.exit()
    //    .remove();



}


function updateData(selectedYear){

    if(sortOrder == 'alphabetical'){

        return nestedData.filter(function(d){return d.key == selectedYear})[0].values.sort(function(a,b){
            return a.fullname.localeCompare(b.fullname);
        });

    }
    else {
        return nestedData.filter(function(d){return d.key == selectedYear})[0].values.sort(function(a,b){
            return b.totalPop-a.totalPop;
        });
    }
}


//this function runs when the HTML slider is moved
function sliderMoved(value){

    newData = updateData(value);
    currentYear = value;
    drawPoints(newData);

}

function radioChange(value){
    sortOrder = value;
    updateData(currentYear)l
}