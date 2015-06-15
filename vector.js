// 2d vectors
var Vector = function(x, y) {
    this.x = !isNaN(x) ? x : 0;
    this.y = !isNaN(y) ? y : 0;
};

// static function - returns new vectors
Vector.add = function(v1, v2) {
    return new this(v1.x + v2.x, v1.y + v2.y);
}

Vector.substract = function(v1, v2) {
    return new this(v1.x - v2.x, v1.y - v2.y);
}

Vector.multiply = function(v1, val) {
    return new this(v1.x * val, v1.y * val);
}

Vector.divide = function(v1, val) {
    return new this(v1.x / val, v1.y / val);
}

Vector.distance = function(v1, v2) {
  var v = this.substract(v2, v1);
  return v.magnitude();
}

Vector.distanceSqrt = function(v1, v2) {
  var v = this.substract(v2, v1);
  return v.magnitudeSqrt();
}

Vector.clone = function(v) {
    return new this(v.x, v.y);
}

Vector.orthogonal = function(v) {
  return new this(-v.y, v.x);
}

// returns a normalized vector orthogonal to the line
// defined by the vector passed as arguments
Vector.normal = function(v1, v2) {
  var temp = Vector.substract(v2, v1).normalize();

  return new this(-temp.y, temp.x);
}

Vector.normalize = function(v) {
  return v.clone().normalize();
}

Vector.dot = function(v1, v2) {
  v1.normalize();
  v2.normalize();
  return (v1.x * v2.x) + (v1.y * v2.y);
}

// instance methods
Vector.prototype.add = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
}

Vector.prototype.substract = function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
}

Vector.prototype.multiply = function(value) {
    if (!(value instanceof Vector)) {
      this.x *= value;
      this.y *= value;
    } else {
      this.x *= value.x
      this.y *= value.y
    }
    return this;
}
Vector.prototype.divide = function(value) {
    return this.multiply(1/value);
}

Vector.prototype.truncate = function(value) {
    if (this.magnitude() > value) {
        this.normalize(value);
    }
    return this;
}

Vector.prototype.normalize = function(multiplier) {
    var multiplier = multiplier ? multiplier : 1;
    var mag = this.magnitude();
    if (mag === 0) { return this; }

    this.x = (this.x / mag);
    this.y = (this.y / mag);
    this.multiply(multiplier);
    return this;
}

Vector.prototype.rotate = function(theta) {
    var finalTheta = this.direction() + theta;
    this.setAngle(finalTheta);
}

Vector.prototype.setAngle = function(theta) {
    var magnitude = this.magnitude();
    this.normalize();
    this.x = Math.cos(theta);
    this.y = Math.sin(theta);
    this.multiply(magnitude);
    return this;
}

Vector.prototype.magnitude = function() {
  return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}
// same as magnitude in square domain, allow to save calcualtion when comparing distances
Vector.prototype.magnitudeSqrt = function() {
  return Math.pow(this.x, 2) + Math.pow(this.y, 2);
}

Vector.prototype.direction = function() {
  // cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
  return Math.atan2(this.y, this.x);
}

Vector.prototype.clone = function() {
  return new this.constructor(this.x, this.y);
}

module.exports = Vector;
