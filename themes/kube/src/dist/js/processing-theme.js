(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sum = sum;
// lib/math.js
function sum(x, y) {
  return x + y;
}

var pi = exports.pi = 3.141593;

},{}],2:[function(require,module,exports){
"use strict";

//import {sum, pi} from "math";
var mymath = require('./lib/math.js');

console.log("2π = " + mymath.sum(mymath.pi, mymath.pi));

},{"./lib/math.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9saWIvbWF0aC5qcyIsImpzL3Byb2Nlc3NpbmctdGhlbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRQ0NnQixHLEdBQUEsRztBQURoQjtBQUNPLFNBQVMsR0FBVCxDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUI7QUFDeEIsU0FBTyxJQUFJLENBQVg7QUFDRDs7QUFFTSxJQUFJLGtCQUFLLFFBQVQ7Ozs7O0FDTFA7QUFDQSxJQUFJLFNBQVMsUUFBUyxlQUFULENBQWI7O0FBRUEsUUFBUSxHQUFSLENBQVksVUFBVSxPQUFPLEdBQVAsQ0FBVyxPQUFPLEVBQWxCLEVBQXNCLE9BQU8sRUFBN0IsQ0FBdEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBsaWIvbWF0aC5qc1xuZXhwb3J0IGZ1bmN0aW9uIHN1bSh4LCB5KSB7XG4gIHJldHVybiB4ICsgeTtcbn1cblxuZXhwb3J0IHZhciBwaSA9IDMuMTQxNTkzOyIsIi8vaW1wb3J0IHtzdW0sIHBpfSBmcm9tIFwibWF0aFwiO1xudmFyIG15bWF0aCA9IHJlcXVpcmUgKCcuL2xpYi9tYXRoLmpzJyk7XG5cbmNvbnNvbGUubG9nKFwiMs+AID0gXCIgKyBteW1hdGguc3VtKG15bWF0aC5waSwgbXltYXRoLnBpKSk7Il19
