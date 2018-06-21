gender();
industry();
usLocations();
gradYear();
gradSchool();
curEmployer();

function gender() {
    //data as an array of json objects, each object holds the information for its respectove 'pie slice'
    var genderData = [
        {
            "name": "women",
            "amount": 10,
            "color": "pink"
        },
        {
            "name": "men",
            "amount": 90,
            "color": "#3265CB"
        }
    ];
    var containerWidth = 300;
    var containerHeight = 300;
    var graphWidth = 200;
    var graphHeight = 200;
    var graphRadius = Math.min(graphWidth, graphHeight) / 2;
    //makes a canvas for the chart to appear on
    var canvas = d3.select('.gender')
        .append('svg')
        .attr('width', containerHeight)
        .attr('height', containerWidth);
    //a 'g' svg element is a container used to group other svg elements
    var g = canvas.append('g')
        .attr('transform', "translate(" + containerWidth / 2 + "," + containerHeight / 2 + ')');
    //generates the pie slices-their size is based on their respective amount field in the data
    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d.amount;
        });
    //creates an arc which goes around the chart and in the center of it
    //setting an inner radius will make a donut chart
    var arc = d3.arc()
        .outerRadius(graphRadius)
        .innerRadius(0)
    //creates an arc for the labels to go around
    var label = d3.arc()
        .outerRadius(graphRadius + 30)
        .innerRadius(graphRadius + 30);
    //selects all arcs in the 'g' group
    //sets the arc and pie's data to the data array and appends a 'g' to it
    var arcs = g.selectAll('.arc')
        .data(pie(genderData))
        //creates any 'missing' elements that the data calls for, appends a g to it, and gives it a class of arc
        .enter()
            .append('g')
                .attr('class', 'gender-pie')
    //creates a path for each section whose color reflects the data for that section
    arcs.append('path')
        //d is the svg attribute for the parameters of the path, arc will make the path generate an arc 
        .attr('d', arc)
        .attr('fill', function(d, i) {
            return d.data.color;
        })
    //creates text for each selection, whose positions will follow the label arc and names will reflect the data for their respective section
    arcs.append('text')
        .attr('transform', function(d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', '1.5em')
        .text(function(d) {
            return d.data.name + " " + d.data.amount + "%";
        })
}

function industry() {
    //data as an array of json objects, each object holds the information for its respectove 'pie slice'
    var industryData = [
        {
            "name": "Technology",
            "amount": 30,
            "color": "#3265CB"
        },
        {
            "name": "Finance",
            "amount": 14,
            "color": "#0098C6"
        },
        {
            "name": "Education",
            "amount": 12,
            "color": "#980098"
        },
        {
            "name": "Medicine",
            "amount": 17,
            "color": "#FF9900"
        },
        {
            "name": "Banking",
            "amount": 6,
            "color": "#DC3A11"
        },
        {
            "name": "Law",
            "amount": 4,
            "color": "#FF66B5"
        },
        {
            "name": "Data",
            "amount": 2,
            "color": "#5BD9A7"
        },
        {
            "name": "Other",
            "amount": 24,
            "color": "#109619"
        }
    ];
    var containerWidth = 450;
    var containerHeight = 450;
    var graphWidth = 400;
    var graphHeight = 400;
    var graphRadius = Math.min(graphWidth, graphHeight) / 2;
    //makes a canvas for the chart to appear on
    var canvas = d3.select('.industry')
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight);
    //a 'g' svg element is a container used to group other svg elements
    var g = canvas.append('g')
        .attr('transform', "translate(" + containerWidth / 2 + "," + containerHeight / 2 + ')');
    //generates the pie slices-their size is based on their respective amount field in the data
    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d.amount;
        });
    //creates an arc which goes around the chart and in the center of it
    //setting an inner radius will make a donut chart
    var path = d3.arc()
        .outerRadius(graphRadius)
        .innerRadius(graphRadius / 2)
        .padAngle(0.015);
    //creates an arc for the labels to go around
    var label = d3.arc()
        .outerRadius(graphRadius / 1.35)
        .innerRadius(graphRadius / 1.35);
    //selects all arcs in the 'g' group
    //sets the arc and pie's data to the data array and appends a 'g' to it
    var arc = g.selectAll('.arc')
        .data(pie(industryData))
        .enter()
        .append('g')
        .attr('class', 'industry-pie')
    //creates a path for each section whose color reflects the data for that section
    arc.append('path')
        .attr('d', path)
        .attr('fill', function(d, i) {
            return d.data.color;
        });
    //creates text for each selection, whose positions will follow the label arc and names will reflect the data for their respective section
    arc.append('text')
        .attr('transform', function(d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('dx', '0.35em')
        .attr('font-size', '1.2em')
        .text(function(d) {
            return d.data.name + ' ' + d.data.amount + '%';
        })
}

function usLocations() {
    var height = 400;
    var width = 800;

    var canvas = d3.select('.us-locations')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
    
    var g = canvas.append('g');
    
    //makes a 2d projection of the us, based on logitude and latitude
    var projection = d3.geoAlbersUsa()
        .translate([width/ 2, height /2])
        .scale(850);
    //converts the projection to paths
    var path = d3.geoPath()
        .projection(projection);
    //loads up the json with the us map data
    d3.json("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json").then(function(data) {
        //gets all the state data from the json and makes paths for each state
        var states = topojson.feature(data, data.objects.states).features;
        canvas.selectAll(".state")
            .data(states)
            .enter()
                .append('path')
                .attr('class', 'state')
                .attr('d', path)
                .attr('fill', '#b62121');
    });
}

function gradYear() {
    //data about how people graduated each year
    var gradYearData = [
        {
            "year": 1981,
            "amount": 1
        },
        {
            "year": 1982,
            "amount": 1
        },
        {
            "year": 1983,
            "amount": 2
        },
        {
            "year": 1984,
            "amount": 5
        },
        {
            "year": 1985,
            "amount": 10
        },
        {
            "year": 1986,
            "amount": 8
        },
        {
            "year": 1987,
            "amount": 14
        },
        {
            "year": 1988,
            "amount": 8
        },
        {
            "year": 1989,
            "amount": 12
        },
        {
            "year": 1990,
            "amount": 7
        },
        {
            "year": 1991,
            "amount": 7
        },
        {
            "year": 1992,
            "amount": 1
        },
        {
            "year": 1993,
            "amount": 5
        },
        {
            "year": 1994,
            "amount": 6
        },
        {
            "year": 1995,
            "amount": 3
        },
        {
            "year": 1996,
            "amount": 7
        },
        {
            "year": 1997,
            "amount": 4
        },
        {
            "year": 1998,
            "amount": 10
        },
        {
            "year": 1999,
            "amount": 14
        },
        {
            "year": 2000,
            "amount": 10
        },
        {
            "year": 2001,
            "amount": 18
        },
        {
            "year": 2002,
            "amount": 12
        },
        {
            "year": 2003,
            "amount": 12
        },
        {
            "year": 2004,
            "amount": 13
        },
        {
            "year": 2005,
            "amount": 5
        },
        {
            "year": 2006,
            "amount": 7
        },
        {
            "year": 2008,
            "amount": 5
        },
        {
            "year": 2009,
            "amount": 2
        },
        {
            "year": 2010,
            "amount": 4
        },
        {
            "year": 2011,
            "amount": 4
        },
        {
            "year": 2012,
            "amount": 6
        },
        {
            "year": 2013,
            "amount": 5
        },
        {
            "year": 2014,
            "amount": 7
        },
        {
            "year": 2015,
            "amount": 6
        },
        {
            "year": 2016,
            "amount": 8
        },
        {
            "year": 2017,
            "amount": 0
        },
        {
            "year": 2018,
            "amount": 4
        }
    ]
    var margin = {top: 20, right: 20, bottom: 50, left: 70}
    var width = 800 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    //chart's x ranges from 0 to the full width. In other words, the highest x is at the rightmost side of the chart
    //the scale is based on year, so we use d3.scaleTime()
    var x = d3.scaleTime()
        .range([0, width]);
    //chart's y ranges from 0 to the full height. In other words, the highest y is at the top of the chart
    var y = d3.scaleLinear()
        .range([height - margin.top, 0]);
    //create the line. Each 'node' will be at the x value of a year and the y value of the amount of graduates
    var line = d3.line()
        .x(function(d) {
            return x(d.year)
        })
        .y(function(d) {
            return y(d.amount)
        });
    //make the chart canvas
    var canvas = d3.select('.grad-year')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
    //attach a group to it
    var g = canvas.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    //for each piece of data, have d3 parse the years as years and add the amount (?)
    gradYearData.forEach(function(d) {
        d.year = d3.timeParse('%Y')(d.year);
        d.amount = +d.amount;
    });
    //sets the x domain to the max and min years from the data
    x.domain(d3.extent(gradYearData, function(d) {
        return d.year;
    }));
    //sets the y domain to the max and min amounts from the data
    y.domain(d3.extent(gradYearData, function(d) {
        return d.amount;
    }));
    //create the x-axis line
    canvas.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(50,' + height + ')')
        .call(d3.axisBottom(x).ticks(gradYearData.length/2));
    //label the line with text
    canvas.append('text')
            .attr('x', (width / 2) + margin.left)
            .attr('y', height + margin.bottom)
            .style('text-anchor', 'middle')
            .style('font-size', '1.5em')
            .text('Year');
    //make the y axis line
    canvas.append('g')
        .attr('class', 'y-axis')
        .attr('transform', 'translate(50, 20)')
        .call(d3.axisLeft(y));
    //label the line with text
    canvas.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x',0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '1.5em')
        .text('Graduates');
    //make an object that will allow the user to focus on a piece of data
    //it will be invisible unless the user's mouse is hovering over the chart
    var focus = canvas.append('g')
        .style('display', 'none')
    //create the line's path using the data
    canvas.append('path')
        .datum(gradYearData)
        .attr('transform', 'translate(50 ,20)')
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
    //append a circle to the focus object, so the data it focuses on will be circled
    focus.append('circle')
        .attr('class', 'focus-circle')
        .style('fill', 'none')
        .attr('r', 7)
    //this is just to detect mouse movement within the chart
    canvas.append('rect')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        //when the mouse hovers over the chart, remove the display css
        .on('mouseover', function() {
            focus.style('display', null)
        })
        //when the mouse hovers off the chart, make the focus circle invisible
        .on('mouseout', function() {
            focus.style('display', 'none')
        })
        //when the mouse moves around the chart, update the focus circle's position to reflect the mouse position and the closest piece of data
        .on('mousemove', function() {
            var x0 = x.invert(d3.mouse(this)[0] - 40);
            var bisectYear = d3.bisector(function(d) { return d.year; }).left;
            var i = bisectYear(gradYearData, x0, 1);
            var d = x0 - gradYearData[i - 1] > gradYearData[i] - x0 ? gradYearData[i] : gradYearData[i - 1];
            focus.select('circle.focus-circle')
                .attr('transform', 'translate(' + (x(d.year) + 50) + ',' + (y(d.amount) + 20) + ')')
        })
}

function gradSchool() {
     //data about the different universities
    var gradSchoolData= [
        {
            "name": "Yeshiva University",
            "schools": [
                {
                    "name": "Azrieli",
                    "total": 4
                },
                {
                    "name": "Cardozo",
                    "total": 4
                },
                {
                    "name": "Bernard Revel",
                    "total": 3
                },
                {
                    "name": "RIETS",
                    "total": 13
                },
                {
                    "name": "Albert Einsten",
                    "total": 1
                },
                {
                    "name": "Other",
                    "total": 18
                },
            ],
            "total": 43,
            "color": "#3265CB"
        },
        {
            "name": "New York University",
            "schools": [
                {
                    "name": "School of Law",
                    "total": 3
                },
                {
                    "name": "School of Business",
                    "total": 12
                },
                {
                    "name": "Schools of Arts & Science",
                    "total": 1
                },
                {
                    "name": "School of Engineering",
                    "total": 3
                },
                {
                    "name": "Other",
                    "total": 24
                },
            ],
            "total": 43,
            "color": "#57068C"
        },
        {
            "name": "Columbia University",
            "schools": [
                {
                    "name": "School of Engineering and Applied Sciences",
                    "total": 4
                },
                {
                    "name": "School of Law",
                    "total": 2
                },
                {
                    "name": "Other",
                    "total": 18
                },
            ],
            "total": 24,
            "color": "#5EA1E4"
        },
        {
            "name": "Yale University",
            "schools": [
                {
                    "name": "School of Medicine",
                    "total": 1
                },
                {
                    "name": "Other",
                    "total": 2
                },
            ],
            "total": 3,
            "color": "#2A3D9F"
        },
        {
            "name": "City University of New York",
            "schools": [
                {
                    "name": "Other",
                    "total": 10
                },
            ],
            "total": 10,
            "color": "#FF9800"
        },
        {
            "name": "MIT",
            "schools": [
                {
                    "name": "Other",
                    "total": 3
                },
            ],
            "total": 3,
            "color": "#A5001E"
        },
        {
            "name": "Harvard University",
            "schools": [
                {
                    "name": "Other",
                    "total": 3
                },
            ],
            "total": 3,
            "color": "#A61C30"
        },
        {
            "name": "Lander College",
            "schools": [
                {
                    "name": "Other",
                    "total": 4
                },
            ],
            "total": 4,
            "color": "#421C4D"
        },
        {
            "name": "Other",
            "schools": [
                {
                    "name": "Other",
                    "total": 32
                },
            ],
            "total": 32,
            "color": "#1BA136"
        }
    ]
    var margin = {top: 20, right: 20, bottom: 50, left: 70}
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    //chart's x ranges from 0 to the full width
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.5);
    //chart's y ranges from 0 to the full width
    var y = d3.scaleLinear()
        .range([height - margin.top, 0]);
    //chart's x ranges from 0 to the full width. In other words, the highest x is at the rightmost side of the chart
    //the scale is based on the university names, so we map the domain to the names
    x.domain(gradSchoolData.map(function(d) {
        return d.name;
    }));
    //chart's y ranges from 0 to the largest total amount of students in any school
    y.domain([0, d3.max(gradSchoolData, function(d) {
        return d.total;
    })]);
    //make the chart canvas
    var canvas = d3.select('.grad-school')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
    //attach a group to it
    var g = canvas.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
     //create the x-axis line
    canvas.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(50,' + height + ')')
        .call(d3.axisBottom(x));
    //label the line with text
    canvas.append('text')
        .attr('x', (width / 2) + margin.left)
        .attr('y', height + margin.bottom)
        .style('text-anchor', 'middle')
        .style('font-size', '1.5em')
        .text('University');
    //create the y-axis line
    canvas.append('g')
        .attr('class', 'y-axis')
        .attr('transform', 'translate(50, 20)')
        .call(d3.axisLeft(y))
    //label the line with text
    canvas.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x',0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '1.5em')
        .text('Alumni');
    //create a bar for each university
    canvas.selectAll('bar')
        .data(gradSchoolData)
        .enter()
            .append('rect')
            .attr('fill', function(d) {
                return d.color;
            })
            //it's x position will be based on its name
            .attr('x', function(d) {
                return x(d.name) + (margin.left / 1.4);
            })
            .attr('width', x.bandwidth)
            //it's y position will be based on its amount of students
            .attr('y', function(d) {
                return y(d.total) + margin.top;
            })
            .attr('height', function(d) {
                return height - y(d.total) - margin.top;
            })
            .style('pointer-events', 'all')
            //when the mouse hovers over a bar, remove the display css, making the focus visible
            //center the text on the bar and display the bar's total amount of students
            .on('mouseover', function(d) {
                focus.style('display', null)
                focus.select('text.focus-text')
                    .attr('transform', 'translate(' + (x(d.name) + 60) + ',' + 
                    ((y(d.total) + 20 + ((height - y(d.total)) / 2 ))) + ')')
                    .text(d.total);
            })
            //when the mouse hovers off of a bar, make the focus invisible
            .on('mouseout', function() {
                focus.style('display', 'none')
            })
           
    //create a focus object for when the mouse is over a bar
    //it's initially invisible
    var focus = canvas.append('g')
        .style('display', 'none')
    //append text to the focus object that will show the particular bar's amount of students
    focus.append('text')
        .attr('class', 'focus-text')
}

function curEmployer() {
    var width = 900;
    var height = 800;
    var r = 10;
    var canvas = d3.select('.cur-employer')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    d3.json("https://raw.githubusercontent.com/nm-ann/cs-alumni-statistics/master/Noam/employer-industries.json").then(function(data) {
        var techNodes = data.employers.filter(employer => {
            return employer.industry.includes('Technology');
        })
        console.log(techNodes);

        var techLinks = techNodes.map(node => {
            return findLink(node, techNodes);
        });
        console.log(techLinks);

        var simulation = d3.forceSimulation(techNodes)
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(function(d) {
                return d.alumni * 5;
              }))
            .force('link', d3.forceLink(techLinks).id(function(d) {
                return d.employer;
            }))
            .on('tick', update(techNodes, techLinks));
    });
}

function findLink(node, techNodes) {
    var result;
    for(let i = 0; i < node.alumni; i++) {
        if(result !== undefined) break;
        techNodes.some(otherNode => {
            if((otherNode !== node) && (node.alumni - otherNode.alumni == i)) {
                result = {
                    'source': node.employer,
                    'target': otherNode.employer
                };
                return result != undefined;
            }
        });
    }
    return result;
}

function update(techNodes, techLinks) {
    var canvas = d3.select('.cur-employer svg')
        .selectAll('circle')
        .data(techNodes)
        .enter()
            .append('circle')
            .attr('r', function(d) {
                return d.alumni * 5;
            })
            .attr('cx', function(d) {
                return d.x;
            })
            .attr('cy', function(d) {
                return d.y;
            });

    canvas.selectAll('line')
        .data(techLinks)
        .enter()
            .appened('line')

    canvas.exit().remove();
}