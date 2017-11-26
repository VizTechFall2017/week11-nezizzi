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

var svg2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr('class', 'svg2')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg3 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr('class', 'svg3')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg4 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr('class', 'svg3')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



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
    scaleY1_2.domain([0, d3.max(dataIn.map(function(d){return +d.F12BFNCR}))]);
    svg2.append("g")
        .attr('class','yaxis')
        .call(d3.axisLeft(scaleY1_2))
        .attr('transform', 'translate('+width/3+',0)');


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


    drawPointsCurrent(currentDancers);
    drawPointsFormer(formerDancers);

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

        linesCurrent.exit()
            .remove();

        linesCurrent.append("path")
            .attr("d", path)
            .attr('fill','none')
            .attr('stroke','purple')
            .attr('opacity', '.35')
            .call(transition)
            .on('mouseover', function(d){
                d3.select(this).attr('opacity', '1');
                //console.log(Map4.get(d.C15BMSCH));
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
                        return  0
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
        .attr('stroke','purple')
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
               if (isNaN(d[p.data])){
                   return [0,0];
               }
               else {
                   return [scaleX_2("What age did you expect to stop Dancing?"), scaleY1_2(+d[p.data])];
               }
            }
            if(p.value ==2){
                //console.log(d[p.data]);
                if (isNaN(d[p.data])){
                    return [0,0];
                }
                else {
                    return [scaleX_2("What age did you actually stop Dancing?"), scaleY2_2(+d[p.data])];
                }
            }
            if(p.value ==3){
                //console.log(Map5.get(+d[p.data]));
                if (isNaN(d[p.data])){
                    return [scaleX_2("Why did you stop dancing?"), scaleY3_2(Map5.get('D'))];
                }
                else {
                    return [scaleX_2("Why did you stop dancing?"), scaleY3_2(Map5.get(+d[p.data]))];
                }
            }
            if(p.value ==4){
                //console.log(scaleY4_2(Map6.get(0)));
                if (isNaN(d[p.data])){
                    return [scaleX_2("What was the most serious challenge you will faced when you stopped dancing?"), scaleY4_2(Map6.get('D'))];
                }
                else {
                    return [scaleX_2("What was the most serious challenge you will faced when you stopped dancing?"), scaleY4_2(Map6.get(+d[p.data]))];
                }

            }
        }))
    }
}

function drawCircles(pointData) {


}


function buttonClicked(){

    svg.selectAll('.current').remove();
    drawPoints(currentDancers);

    svg2.selectAll('.former').remove();
    drawPointsFormer(formerDancers);


}
