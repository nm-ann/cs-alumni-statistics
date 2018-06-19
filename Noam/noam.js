gender();
industry();

function gender() {
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

    var canvas = d3.select('.gender')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var g = canvas.append('g')
        .attr('transform', "translate(" + width / 2 + "," + height / 2 + ')');

    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d.amount;
        });
    //setting an inner radius will make a donut chart
    var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0)
        
    var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    
    var arc = g.selectAll('.arc')
        .data(pie(genderData))
        .enter()
        .append('g')
        .attr('class', 'arc')

    arc.append('path')
        .attr('d', path)
        .attr('fill', function(d, i) {
            return d.data.color;
        })
    
    arc.append('text')
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

    var canvas = d3.select('.industry')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var g = canvas.append('g')
        .attr('transform', "translate(" + width / 2 + "," + height / 2 + ')');

    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d.amount;
        });
    //setting an inner radius will make a donut chart
    var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius / 2)
        .padAngle(0.015);
        
    var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    
    var arc = g.selectAll('.arc')
        .data(pie(industryData))
        .enter()
        .append('g')
        .attr('class', 'arc')

    arc.append('path')
        .attr('d', path)
        .attr('fill', function(d, i) {
            return d.data.color;
        });
    
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