// Takes in the wind bearing in degrees (0-359) and converts it to a human readable string, then returns the string
function convertWindBearing(bearingDegrees) {
/*
Wind bearing:
350 to 010 - North
011 to 039 - NNE
040 to 050 - NE
051 to 079 - ENE
80 to 100 - East
101 to 129 - ESE
130 to 140 - SE
141 to 169 - SSE
170 to 190 - South
191 to 219 - SSW
220 to 230 - SW
231 to 259 - WSW
260 to 280 - West
281 to 309 - WNW
310 to 320 - NW
321 to 349 - NNW
*/
  switch (true) {
    case bearingDegrees >= 350 || bearingDegrees <= 010:
      return "N";
    case bearingDegrees <= 39:
      return "NNE";
    case bearingDegrees <= 050:
      return "NE";
    case bearingDegrees <= 79:
      return "ENE";
    case bearingDegrees <= 100:
      return "E";
    case bearingDegrees <= 129:
      return "ESE";
    case bearingDegrees <= 140:
      return "SE";
    case bearingDegrees <= 169:
      return "SSE";
    case bearingDegrees <= 190:
      return "S";
    case bearingDegrees <= 219:
      return "SSW";
    case bearingDegrees <= 230:
      return "SW";
    case bearingDegrees <= 259:
      return "WSW";
    case bearingDegrees <= 280:
      return "W";
    case bearingDegrees <= 309:
      return "WNW";
    case bearingDegrees <= 320:
      return "NW";
    case bearingDegrees <= 349:
      return "NNW";
    default:
      return "--";
  }
};


module.exports = convertWindBearing;