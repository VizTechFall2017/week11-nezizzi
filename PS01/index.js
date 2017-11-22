var margin = {top: 66, right: 180, bottom: 20, left: 110},
    width = document.body.clientWidth - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    innerHeight = height - 2;


var scaleX= d3.scaleOrdinal().range([0, width]);
var scaleY1 = d3.scaleLinear().range([height, 0]);
var scaleY2 = d3.scalePoint().range([height, 0]);
var scaleY3 = d3.scalePoint().range([height, 0]);
var scaleY4 = d3.scalePoint().range([height, 0]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



///////////////////////////////////////////////////Define variables//////////////////////////////////////////////

var nestedData = [];
var formerDancers;
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
        scaleY1.domain([0, d3.max(dataIn.map(function(d){return +d.C12STPCR}))]);
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

        drawPoints(currentDancers);

    });



    function drawPoints(pointData){



        var line= d3.line()
            //.curve(d3.curveCatmullRom);
            .curve(d3.curveCardinal);


        var pathData= [ {value: 1, data: "C12STPCR"},
            {value: 2, data: "C13STOP1"},
            {value: 3, data: "C15BMSCH"}
        ];

        var pathMap= pathData.forEach(function (d) {
            Map.set(d.value, d.data);
        });

      // Add a group element for each dimension.
         linesCurrent = svg.append("g")
            .attr("class", "current")
            .selectAll("path")
            .data(pointData)
             .enter();


        linesCurrent.append("path")
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



        // Returns the path for a given data point.
        function path(d) {
            return line(pathData.map(function(p) {
                //console.log(p.data, d[p.data], scaleY1(d[p.data]));
                //console.log(p,scaleX(p.value),scaleY1(d[p.data]));

                if(p.value ==1){
                    //console.log(d[p.data]);
                    return [scaleX("What age do you think you will stop Dancing?"), scaleY1(d[p.data])];
                }
                if(p.value ==2){
                    //console.log(d[p.data]);
                    //console.log(Map2.get(+d[p.data]));
                    //console.log(Map3.get(+d[p.data]));
                    return [scaleX("Why do you think you will stop dancing?"), scaleY2(Map3.get(+d[p.data]))];
                }
                if(p.value ==3){
                    //console.log(d[p.data]);
                    //console.log(Map3.get(+d[p.data]));
                    return [scaleX("What will be the most serious challenge you will face when you stop dancing?"), scaleY3(Map4.get(+d[p.data]))];
                }
            }))
        }


}

/* function buttonClicked(){

    if(clicked == true){
        drawPoints(currentDancers);
        clicked = false;

    }
    else{
        drawPoints(formerDancers);
        clicked = true;
    }
}
*/