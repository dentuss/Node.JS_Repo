var modulePoint = require("./cache");

var point1 = new modulePoint.Point(1, 2);
var point2 = new modulePoint.Point(1, 3);
var interface = new modulePoint.LineInt(point1, point2);

interface.isParallel();