//gets position of every satellite
function getPosition(satrec, time) {
  var position_and_velocity = satellite.propagate(satrec,
    time.getUTCFullYear(),
    time.getUTCMonth() + 1,
    time.getUTCDate(),
    time.getUTCHours(),
    time.getUTCMinutes(),
    time.getUTCSeconds());
  var position_eci = position_and_velocity["position"];

  var gmst = satellite.gstime_from_date(time.getUTCFullYear(),
    time.getUTCMonth() + 1,
    time.getUTCDate(),
    time.getUTCHours(),
    time.getUTCMinutes(),
    time.getUTCSeconds());

  var position_gd = satellite.eci_to_geodetic(position_eci, gmst);
  var latitude = satellite.degrees_lat(position_gd["latitude"]);
  var longitude = satellite.degrees_long(position_gd["longitude"]);
  var altitude = position_gd["height"] * 1000;

  return new WorldWind.Position(latitude, longitude, altitude);
}

function jday(year, mon, day, hr, minute, sec) {
  'use strict';
  return (367.0 * year -
    Math.floor((7 * (year + Math.floor((mon + 9) / 12.0))) * 0.25) +
    Math.floor(275 * mon / 9.0) +
    day + 1721013.5 +
    ((sec / 60.0 + minute) / 60.0 + hr) / 24.0  //  ut in days
    //#  - 0.5*sgn(100.0*year + mon - 190002.5) + 0.5;
  );
}

function getVelocity(satrec, time) {
  var j = jday(time.getUTCFullYear(),
    time.getUTCMonth() + 1, // Note, this function requires months in range 1-12.
    time.getUTCDate(),
    time.getUTCHours(),
    time.getUTCMinutes(),
    time.getUTCSeconds());
  j += time.getUTCMilliseconds() * 1.15741e-8;


  var m = (j - satrec.jdsatepoch) * 1440.0;
  var pv = satellite.sgp4(satrec, m);
  var vx, vy, vz;

  vx = pv.velocity.x;
  vy = pv.velocity.y;
  vz = pv.velocity.z;

  var satVelocity = Math.sqrt(
    vx * vx +
    vy * vy +
    vz * vz
  );
  return satVelocity;
}