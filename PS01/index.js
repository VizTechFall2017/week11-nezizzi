var margin = {top: 66, right: 180, bottom: 20, left: 110},
    width = document.body.clientWidth - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    innerHeight = height - 2;


var scaleX= d3.scaleOrdinal().range([0, width]);
var scaleY1 = d3.scaleLinear().range([height, 0]);
var scaleY2 = d3.scalePoint().range([height, 0]);
var scaleY3 = d3.scalePoint().range([height, 0]);
var scaleX_2= d3.scaleOrdinal().range([0, width]);
var scaleY1_2 = d3.scaleLinear().range([height, 0]);
var scaleY2_2 = d3.scalePoint().range([height, 0]);
var scaleY3_2 = d3.scalePoint().range([height, 0]);
var scaleY4_2 = d3.scalePoint().range([height, 0]);





var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr('class', 'svg')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svg.append('text')
    .text('Current Dancers')
    .attr("transform", "translate(" + width + "," + height/2 + ")");

var svg2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr('class', 'svg2')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg2.append('text')
    .text('Former Dancers')
    .attr("transform", "translate(" + width + "," + height/2 + ")");

var svg3 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr('class', 'svg3')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg3.append('text')
    .text('Current Dancers')
    .attr("transform", "translate(" + margin.left + "," + height/2 + ")");

var svg4 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr('class', 'svg4')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg4.append('text')
    .text('Former Dancers')
    .attr("transform", "translate(" + margin.left + "," + height/2 + ")");




///////////////////////////////////////////////////Define variables//////////////////////////////////////////////

var nestedData = [];
var nestedData2 = [];
var formerDancers;
var currentDancers1;
var currentDancers;
clicked=false;
var Map = d3.map();
var Map1 = d3.map();
var Map2 = d3.map();
var Map3 = d3.map();
var Map4 = d3.map();
var Map5 = d3.map();
var Map6 = d3.map();
var linesCurrent;

//circle variables
var circles;
var circle_axis;
var circles2;
var circle_axis2;
var center_x= width/2;
var center_y= height/2;
var R=19;

///////////////////////////////////////////////////Answer key maps//////////////////////////////////////////////
var danceEd = [{value: 1, text: "None"},
    {value: 2, text: "Diploma from Dance School"},
    {value: 3, text: "Diploma from Performing Arts School"},
    {value: 4, text: "Bachelor's Degree"},
    {value: 5, text: " Advanced Diploma from Dance School"},
    {value: 6, text: "Advanced Diploma from Performing Arts School"},
    {value: 7, text: "Graduate Degree"},
    {value: 8, text: "Other"},
    {value: "D", text: "Did not answer"}
];


var danceEdLabel= danceEd.forEach(function (d) {
    Map1.set(d.value, d.text);
});


var nonDanceEd = [{value: 1, text: "Completed Primary School"},
    {value: 2, text: "Completed Secondary School"},
    {value: 3, text: "Post-Secondary Diploma, certificate"},
    {value: 4, text: "Bachelor's Degree"},
    {value: 5, text: "Graduate Degree"},
    {value: 6, text: "Other"},
    {value: "D", text: "Did not answer"}
];


var nonDanceEdLabel= nonDanceEd.forEach(function (d) {
    Map2.set(d.value, d.text);
});




var whyStopCurrent= [ {value: 1, text: "Feeling to old to Continue"},
    {value: 2, text: "Financial Difficulties"},
    {value: 3, text: "Health/effect of Injuries"},
    {value: 4, text: "Dance work not likely to be available"},
    {value: 5, text: "Desire to move to a new Career"},
    {value: 6, text: "Contract Expires"},
    {value: 7, text: "Other"},
    {value: 8, text: "Don't know"},
    {value: 9, text: "Family Responsibilities/Desire to Start a Family"},
    {value: 10, text: "When it is no longer enjoyable"},
    {value: "D", text: "Did not answer"}
];

var whyStopCurrentLabel= whyStopCurrent.forEach(function (d) {
    Map3.set(d.value, d.text);
});


var challengesCurrent= [ {value: 1, text: "Physical Problems"},
    {value: 2, text: "Loss of Status"},
    {value: 3, text: "Loss of Income"},
    {value: 4, text: "Loss of Friends and Support Network"},
    {value: 5, text: "Emotional Problems"},
    {value: 6, text: "Difficulty Deciding What to do Next"},
    {value: 7, text: "A Sense of Emptiness"},
    {value: 8, text: "Other"},
    {value: 9, text: "Don't know"},
    {value: "D", text: "Did not answer"}
];

var challengesCurrentLabel= challengesCurrent.forEach(function (d) {
    Map4.set(d.value, d.text);
});


var whyStopFormer= [ {value: 1, text: "Feeling to old to Continue"},
    {value: 2, text: "Financial Difficulties"},
    {value: 3, text: "Health/effect of Injuries"},
    {value: 4, text: "Dance work not available"},
    {value: 5, text: "Desire to move to a new Career"},
    {value: 6, text: "Contract Expired"},
    {value: 7, text: "Other"},
    {value: 8, text: "Don't know"},
    {value: 9, text: "Family Responsibilities"},
    {value: 10, text: "No longer enjoyable"},
    {value: "D", text: "Did not answer"}
];

var whyStopFormerLabel= whyStopFormer.forEach(function (d) {
    Map5.set(d.value, d.text);
});


var challengesFormer= [ {value: 1, text: "Physical Problems"},
    {value: 2, text: "Loss of Status"},
    {value: 3, text: "Loss of Income"},
    {value: 4, text: "Loss of Friends and Support Network"},
    {value: 5, text: "Emotional Problems"},
    {value: 6, text: "Difficulty Deciding What to do Next"},
    {value: 7, text: "A Sense of Emptiness"},
    {value: 8, text: "Other"},
    {value: 9, text: "Don't Remember"},
    {value: "D", text: "Did not answer"}
];

var challengesFormerLabel= challengesFormer.forEach(function (d) {
    Map6.set(d.value, d.text);
});
////////////////////////////////////////////////////////////Answer key maps end ///////////////////////////////////////////////////////////////


//tool tip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


///////////////////////////////////////////////////////////import data//////////////////////////////////////////////////////////////////////
d3.csv('./data.csv', function(dataIn){



    nestedData = d3.nest()
        .key(function (d) {
            return d.A1CURFOR
        })
        .entries(dataIn);
    currentDancers = nestedData.filter(function(d){return d.key == '1'})[0].values;
    formerDancers = nestedData.filter(function(d){return d.key == '2'})[0].values;


    scaleX.domain(["What age do you think you will stop Dancing?", "Why do you think you will stop dancing?", "What will be the most serious challenge you will face when you stop dancing?"])
            .range([0, width/2, width]);

    svg.append("g")
        . attr('class', 'xaxis')
        .call(d3.axisBottom(scaleX))
        .attr('transform', 'translate(0,'+height+')');


       //Axis for "What AGE do you think you will stop dancing?"
        scaleY1.domain([0, d3.max(dataIn.map(function(d){return +d.C12STPCR }))]);
        svg.append("g")
            .attr('class','yaxis')
            .call(d3.axisLeft(scaleY1));

        //Axis for "Why do you think you will stop dancing?"
        scaleY2.domain(dataIn.map(function(d){return Map3.get(+d.C13STOP1)}));
        svg.append("g")
            .attr('class','yaxis')
            .call(d3.axisLeft(scaleY2))
            .attr('transform', 'translate('+width/2+',0)');


        //Axis for "What Challenges do you think will be most serious?"
        scaleY3.domain(dataIn.map(function(d){return Map4.get(+d.C15BMSCH)}));
        svg.append("g")
            .attr('class','yaxis')
            .call(d3.axisLeft(scaleY3))
            .attr('transform', 'translate('+width+',0)');



    scaleX_2.domain(["What age did you expect to stop Dancing?", "What age did you actually stop Dancing?", "Why did you stop dancing?", "What was the most serious challenge you will faced when you stopped dancing?"])
        .range([0, width/3, 2*width/3, width]);

    svg2.append("g")
        .attr('class', 'xaxis')
        .call(d3.axisBottom(scaleX_2))
        .attr('transform', 'translate(0,'+height+')');


    //Axis for "What age did you expect to stop Dancing?
    scaleY1_2.domain([0, d3.max(dataIn.map(function(d){return +d.F12AEXFN}))]);
    svg2.append("g")
        .attr('class','yaxis')
        .call(d3.axisLeft(scaleY1_2));

    //"What age did you actually  stop Dancing?"

    //console.log(d3.max(dataIn.map(function(d) {return +d.F12BFNCR})));
    scaleY2_2.domain([0, d3.max(dataIn.map(function(d) {return +d.F12BFNCR}))]);
    svg2.append("g")
        .attr('class','yaxis')
        .call(d3.axisLeft(scaleY2_2))
        .attr('transform', 'translate('+width/3+',0)');

//F12BFNCR
    //Axis for Why did you think you would stop dancing?
    scaleY3_2.domain(dataIn.map(function(d){return Map5.get(+d.F13STOP1)}));
    svg2.append("g")
        .attr('class','yaxis')
        .call(d3.axisLeft(scaleY3_2))
        .attr('transform', 'translate('+2*width/3+',0)');


    //Axis for "What was the most serious challenge you will faced when you stopped dancing?"
    scaleY4_2.domain(dataIn.map(function(d){return Map6.get(+d.F15BMSCH)}));
    svg2.append("g")
        .attr('class','yaxis')
        .call(d3.axisLeft(scaleY4_2))
        .attr('transform', 'translate('+width+',0)');



    circles=svg3.selectAll('circle')
        .data(challengesCurrent)
        .enter()
        .append('circle');

    circle_axis= circles
        .attr("cx", center_x)
        .attr("cy", center_y)
        .attr("r", function(d){
            if (isNaN(d.value)) {
                return 0
            } else {
                return R*d.value
            }
        })
        .attr("stroke", "black")
        .attr('stroke-dasharray', function (d) {
            return d.value
        })
        .attr('stoke-width', '10')
        .attr("fill", "none")
        .attr('data-toggle', 'tooltip')
        .attr('title', function(d){
            return  d.text;
        });

    //circle axis key1
    axisKey=svg3.selectAll('line')
        .data(challengesCurrent)
        .enter()
        .append('line');

    axisKeyLabel= axisKey
        .attr("x1", 6*width/8)
        .attr("y1", function(d){
            if (isNaN(d.value)) {
                return -1000
            } else {
                return 10+15*d.value
            }
        })
        .attr("x2", 7*width/8)
        .attr("y2", function(d){
            if (isNaN(d.value)) {
                return -1000
            } else {
                return 10+15*d.value
            }
        })
        .attr("stroke", "black")
        .attr('stoke-width', '10')
        .attr('stroke-dasharray', function (d) {
            return d.value
        });


    textKey= svg3.selectAll('text')
        .data(challengesCurrent)
        .enter()
        .append('text');

    textKey1= textKey
        .attr('x', 3+7*width/8)
        .attr('y', function(d){
            if (isNaN(d.value)) {
                return 12+15
            } else {
                return 12+15*d.value
            }})
        .text(function(d){
            if (isNaN(d.value)) {
                return 'Did Not Answer'
            } else {
                return d.text
            }})
        .attr("font-size", "10px")
        .attr("fill", "black");



    circles2=svg4.selectAll('circle')
        .data(challengesFormer)
        .enter()
        .append('circle');

    circle_axis2= circles2
        .attr("cx", center_x)
        .attr("cy", center_y)
        .attr("r", function(d){
             if (isNaN(d.value)) {
                return 0
            } else {
                return R*d.value
            }
        })
        .attr("stroke", "black")
        .attr('stroke-dasharray', function (d) {
            return d.value
        })
        .attr('stoke-width', '10')
        .attr("fill", "none")
        .attr('data-toggle', 'tooltip')
        .attr('title', function(d){
            return  d.text;
        });


    //circle axis key2
    axisKey=svg4.selectAll('line')
        .data(challengesFormer)
        .enter()
        .append('line');

    axisKeyLabel= axisKey
        .attr("x1", 6*width/8)
        .attr("y1", function(d){
            if (isNaN(d.value)) {
                return -1000
            } else {
                return 10+15*d.value
            }
        })
        .attr("x2", 7*width/8)
        .attr("y2", function(d){
            if (isNaN(d.value)) {
                return -1000
            } else {
                return 10+15*d.value
            }
        })
        .attr("stroke", "black")
        .attr('stoke-width', '10')
        .attr('stroke-dasharray', function (d) {
            return d.value
        });


    textKey2= svg4.selectAll('text')
        .data(challengesFormer)
        .enter()
        .append('text');

    textKey3= textKey2
        .attr('x', 3+7*width/8)
        .attr('y', function(d){
            if (isNaN(d.value)) {
                return 12+15
            } else {
                return 12+15*d.value
            }})
        .text(function(d){
            if (isNaN(d.value)) {
                return 'Did Not Answer'
            } else {
                return d.text
            }})
        .attr("font-size", "10px")
        .attr("fill", "black");



    //drawPointsCurrent(currentDancers);
    //drawPointsFormer(formerDancers);
    drawCirclesCurrent(currentDancers);
    drawCirclesFormer(formerDancers);

    });



    function drawPointsCurrent(pointData){

        var pathData= [ {value: 1, data: "C12STPCR"},
            {value: 2, data: "C13STOP1"},
            {value: 3, data: "C15BMSCH"}
        ];

        var pathMap= pathData.forEach(function (d) {
            Map.set(d.value, d.data);
        });



        var lineGen= d3.line()
        //.curve(d3.curveCatmullRom);
            .curve(d3.curveCardinal);

       linesCurrent = svg.append("g")
            .attr("class", "current")
            .selectAll("path")
            .data(pointData)
           .enter();

        linesCurrent.append("path")
            .call(transition)
            .attr("d", path)
            .attr('fill','none')
            .attr('stroke','purple')
            .attr('opacity', '.35')
            .on('mouseover', function(d){
                d3.select(this).attr('opacity', '1');
            })
            .on('mouseout', function(d){
                d3.select(this).attr('opacity', '.35');
            });


            function transition(path) {
                path.transition()
                    .duration(7500)
                    .attrTween("stroke-dasharray", tweenDash)
                    .delay(function(d,i) { return i*50; })
            }

            function tweenDash() {
                var l = this.getTotalLength(),
                    i = d3.interpolateString("0," + l, l + "," + l);
                return function(t) { return i(t) };

        }

        // Returns the path for a given data point.
        function path(d) {
            return lineGen(pathData.map(function(p) {
                //console.log(p.data, d[p.data], scaleY1(d[p.data]));
                //console.log(p,scaleX(p.value),scaleY1(d[p.data]));
                if(p.value ==1){
                    if (isNaN(d[p.data])){
                        return 0
                        //return [scaleX("What age do you think you will stop Dancing?"), scaleY1('D')];
                    }
                    else {
                        return [scaleX("What age do you think you will stop Dancing?"), scaleY1(+d[p.data])];
                    }
                }
                if(p.value ==2){
                    //console.log(d[p.data]);
                    //console.log(Map2.get(+d[p.data]));
                    //console.log(Map3.get('D'));
                    if (isNaN(d[p.data])) {
                        return [scaleX("Why do you think you will stop dancing?"), scaleY2(Map3.get('D'))];
                    }
                    else {
                        return [scaleX("Why do you think you will stop dancing?"), scaleY2(Map3.get(+d[p.data]))];
                    }
                }
                if(p.value ==3){
                    //console.log(d[p.data]);
                    if (isNaN(d[p.data])){
                        return [scaleX("What will be the most serious challenge you will face when you stop dancing?"), scaleY3(Map4.get('D'))];
                    }
                    else {
                        return [scaleX("What will be the most serious challenge you will face when you stop dancing?"), scaleY3(Map4.get(+d[p.data]))];
                    }
                }
            }))
        }
}


function drawPointsFormer(pointData){

    var pathData= [ {value: 1, data: "F12AEXFN"},
        {value: 2, data: "F12BFNCR"},
        {value: 3, data: "F13STOP1"},
        {value: 4, data: "F15BMSCH"}
    ];

    var pathMap= pathData.forEach(function (d) {
        Map.set(d.value, d.data);
    });

    var lineGen= d3.line()
       .curve(d3.curveCardinal);

    linesFormer= svg2.append("g")
        .attr("class", "former")
        .selectAll("path")
        .data(pointData)
        .enter();

    linesFormer.exit()
        .remove();

    linesFormer.append("path")
        .attr("d", path)
        .attr('fill','none')
        .attr('stroke','blue')
        .attr('opacity', '.35')
        .call(transition)
        .on('mouseover', function(d){
            d3.select(this).attr('opacity', '1');
        })
        .on('mouseout', function(d){
            d3.select(this).attr('opacity', '.35');
        });


    function transition(path) {
        path.transition()
            .duration(7500)
            .attrTween("stroke-dasharray", tweenDash)
            .delay(function(d,i) { return i*50; })
    }

    function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t) };
    }

    // Returns the path for a given data point.
    function path(d) {
        return lineGen(pathData.map(function(p) {
           if(p.value ==1){
               //console.log(scaleY1_2(d[p.data]));
               if (isNaN(+d[p.data])){
                   return [scaleX_2("What age did you expect to stop Dancing?"), 0]
               }
               else {
                   return [scaleX_2("What age did you expect to stop Dancing?"), scaleY1_2(+d[p.data])];
               }
            }
            if(p.value ==2){
                //console.log(+d[p.data]);
               //console.log(scaleY2_2(+d[p.data]));
                if (isNaN(+d[p.data])){
                    return [scaleX_2("What age did you actually stop Dancing?"), 0];
                }
                else {
                    return [scaleX_2("What age did you actually stop Dancing?"), scaleY2_2(+d[p.data])];
                }
            }
            if(p.value ==3){
                               //console.log(Map5.get(+d[p.data]));
                if (isNaN(+d[p.data])){
                    return [scaleX_2("Why did you stop dancing?"), scaleY3_2(Map5.get('D'))];
                }
                else {
                    return [scaleX_2("Why did you stop dancing?"), scaleY3_2(Map5.get(+d[p.data]))];
                }
            }
            if(p.value ==4){
                //console.log(scaleY4_2(Map6.get(0)));
                if (isNaN(+d[p.data])){
                    return [scaleX_2("What was the most serious challenge you will faced when you stopped dancing?"), scaleY4_2(Map6.get('D'))];
                }
                else {
                    return [scaleX_2("What was the most serious challenge you will faced when you stopped dancing?"), scaleY4_2(Map6.get(+d[p.data]))];
                }

            }
        }))
    }
}

function drawCirclesCurrent(pointData) {
    var lines = svg3.selectAll('.dataLines')
        .data(pointData, function(d){
            //console.log(d.A6QUALS1);
            return d.C13STOP1;
        });

    /*
        var lineGen = d3.radialLine()
            .radius(function(d) {

                if (isNaN(d.C13STOP1)) {
                    return center_x
                } else {
                    return R*+d.C13STOP1
                }
            })
            .angle(Math.PI/180);



        svg3.append("path")
            .datum(pointData)
            .attr("class", "line")
            .attr("d", function (d){
                lineGen(pointData)
            });

    */

        lines
            .enter()
            .append('line')
            .attr('x1',center_x)
            .attr('y1',center_y)
            .attr('x2', function(d){
                if (isNaN(d.C13STOP1)) {
                    return center_x
                } else {
                    return center_x - R*d.C13STOP1*(Math.cos((Math.floor(Math.random()*360))*(Math.PI/180)))
                }
            })
            .attr('y2', function(d){
                if (isNaN(d.C13STOP1)) {
                    return center_y
                } else {
                    return  center_y - R*d.C13STOP1*(Math.sin((Math.floor(Math.random()*360))*(Math.PI/180)))
                }
            })
            .attr('id', function(d){
                return 'id' + d.CASEID
            })
            .attr('stroke','purple')
            .attr('opacity', '.5')
            .attr('class', 'dataLines')




}



function drawCirclesFormer(pointData) {
    var lines = svg4.selectAll('.dataLines')
        .data(pointData, function(d){
            //console.log(d.A6QUALS1);
            return d.F13STOP1;
        });


    lines
        .enter()
        .append('line')
        .attr('x1',center_x)
        .attr('y1',center_y)
        .attr('x2', function(d){
            if (isNaN(d.F13STOP1)) {
                return center_x
            } else {
                return center_x - R*d.F13STOP1*(Math.cos((Math.floor(Math.random()*360))*(Math.PI/180)))
            }
        })
        .attr('y2', function(d){
            if (isNaN(d.F13STOP1)) {
                return center_y
            } else {
                return  center_y - R*d.F13STOP1*(Math.sin((Math.floor(Math.random()*360))*(Math.PI/180)))
            }
        })
        .attr('id', function(d){
            return 'id' + d.CASEID
        })
        .attr('stroke','blue')
        .attr('opacity', '.35')
        .attr('class', 'dataLines')

}


function updateData(){
    svg3.selectAll('.dataLines').remove();
    drawCirclesCurrent(currentDancers);

    svg4.selectAll('.dataLines').remove();
    drawCirclesFormer(formerDancers);
}

window.setInterval(function(){
    updateData();
}, 1000);

function buttonClicked(){

    svg.selectAll('.current').remove();
    drawPointsCurrent(currentDancers);

    svg2.selectAll('.former').remove();
    drawPointsFormer(formerDancers);

    svg3.selectAll('.dataLines').remove();
    drawCirclesCurrent(currentDancers);

    svg4.selectAll('.dataLines').remove();
    drawCirclesFormer(formerDancers);


}
