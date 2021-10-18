"use strict";
const DEGREES_IN_RADIAN = 57.29577951
const MEAN_EARTH_RADIUS_KM = 6371
const KILOMETRES_IN_MILE = 1.60934

const my_location = "51.5144636,-0.142571";

var express     = require('express'),
    fs          = require('fs'),
    app         = express(),
    customers   = JSON.parse(fs.readFileSync('data/customers.json', 'utf-8')),
    inContainer = process.env.CONTAINER,
    port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, X-XSRF-TOKEN, X-InlineCount, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

if (!inContainer) {
    app.use(express.static(__dirname + '/dist'));
    console.log(__dirname);
}

var temp = []
var customer, office;
for (var i=0;i<customers.length;i++) {
  var dataObject = customers[i];
  var offices = dataObject["offices"];
  for (var j=0;j<offices.length;j++) {
    office = offices[j];
    var calc_distance = calculateRadians(my_location, office["coordinates"])
    customer = {"id": dataObject["id"],"organization": dataObject["organization"],
    "location": office["location"], "address": office["address"], "distance": calc_distance}
    temp.push(customer)
  }
}
temp.sort((partner1, partner2) => {
    return compareObjects(partner1, partner2, 'organization')
  })
customers = temp;
var pagedCustomers_total;
app.get('/api/customers/page/:skip/:top', (req, res) => {
    res.setHeader('X-InlineCount', customers.length);
    res.json(customers);
});

function calculateRadians(point1, point2)
{
    var latitude1_radians = parseFloat(point1.split(",")[0]) / DEGREES_IN_RADIAN;
    var longitude1_radians = parseFloat(point1.split(",")[1]) / DEGREES_IN_RADIAN;
    var latitude2_radians = parseFloat(point2.split(",")[0]) / DEGREES_IN_RADIAN;
    var longitude2_radians =  parseFloat(point2.split(",")[1]) / DEGREES_IN_RADIAN;

    var longitudes_abs_diff = Math.abs(longitude1_radians - longitude2_radians);
    var central_angle_radians = Math.acos(Math.sin(latitude1_radians)
                                           * Math.sin(latitude2_radians)
                                           + Math.cos(latitude1_radians)
                                           * Math.cos(latitude2_radians)
                                           * Math.cos(longitudes_abs_diff));

    var central_angle_degrees = central_angle_radians * DEGREES_IN_RADIAN;

    var distance_kilometres = MEAN_EARTH_RADIUS_KM * central_angle_radians;
    return Math.round(distance_kilometres / KILOMETRES_IN_MILE);
}

function compareObjects(org1, org2, key) {
  const obj1 = org1[key].toUpperCase()
  const obj2 = org2[key].toUpperCase()

  if (obj1 < obj2) {
    return -1
  }
  if (obj1 > obj2) {
    return 1
  }
  return 0
}

if (!inContainer) {
    app.all('/*', function(req, res) {
        res.sendFile(__dirname + '/dist/index.html');
    });
}

app.listen(port);

console.log('Express listening on port ' + port);

if (!inContainer) {
    var opn = require('opn');
    opn('http://localhost:' + port).then(() => {
        console.log('Browser closed.');
    });
}


