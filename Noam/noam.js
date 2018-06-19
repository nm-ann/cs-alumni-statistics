gender();
industry();

function gender() {
    //data as an array of json objects, each object holds the information for its respectove 'pie slice'
    var genderData = [
        {
            "name": "women",
            "amount": 25,
            "color": "pink"
        },
        {
            "name": "men",
            "amount": 75,
            "color": "blue"
        }
    ];
    var width = 400;
    var height = 400;
    var radius = Math.min(width, height) / 2;
    //makes a canvas for the chart to appear on
    var canvas = d3.select('.gender')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    //a 'g' svg element is a container used to group other svg elements
    var g = canvas.append('g')
        .attr('transform', "translate(" + width / 2 + "," + height / 2 + ')');
    //generates the pie slices-their size is based on their respective amount field in the data
    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d.amount;
        });
    //creates an arc which goes around the chart and in the center of it
    //setting an inner radius will make a donut chart
    var arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0)
    //creates an arc for the labels to go around
    var label = d3.arc()
        .outerRadius(radius - 80)
        .innerRadius(radius - 80);
    //selects all arcs in the 'g' group
    //sets the arc and pie's data to the data array and appends a 'g' to it
    var arcs = g.selectAll('.arc')
        .data(pie(genderData))
        //creates any 'missing' elements that the data calls for, appends a g to it, and gives it a class of arc
        .enter()
            .append('g')
                .attr('class', 'arc')
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
        .attr('font-size', '2em')
        .text(function(d) {
            return d.data.name + " " + d.data.amount;
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
    var width = 600;
    var height = 600;
    var radius = Math.min(width, height) / 2;
    //makes a canvas for the chart to appear on
    var canvas = d3.select('.industry')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    //a 'g' svg element is a container used to group other svg elements
    var g = canvas.append('g')
        .attr('transform', "translate(" + width / 2 + "," + height / 2 + ')');
    //generates the pie slices-their size is based on their respective amount field in the data
    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d.amount;
        });
    //creates an arc which goes around the chart and in the center of it
    //setting an inner radius will make a donut chart
    var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius / 2)
        .padAngle(0.015);
    //creates an arc for the labels to go around
    var label = d3.arc()
        .outerRadius(radius - 80)
        .innerRadius(radius - 80);
    //selects all arcs in the 'g' group
    //sets the arc and pie's data to the data array and appends a 'g' to it
    var arc = g.selectAll('.arc')
        .data(pie(industryData))
        .enter()
        .append('g')
        .attr('class', 'arc')
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
        .attr('font-size', '1.5em')
        .text(function(d) {
            return d.data.name + ' ' + d.data.amount + '%';
        })
}