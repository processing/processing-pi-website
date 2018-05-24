(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// var mymath = require ('./lib/math.js');
//
// console.log("2π = " + mymath.sum(mymath.pi, mymath.pi));

console.log('init');

var app = {};

app.highlight = function () {
  var blocks = document.querySelectorAll('pre code');
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    var rootElement = block.parentElement;
    var lineCodes = block.innerHTML.split(/\n/);
    if (lineCodes[lineCodes.length - 1] === '') lineCodes.pop();
    var lineLength = lineCodes.length;

    var codeLineHtml = '';
    for (var _i = 0; _i < lineLength; _i++) {
      codeLineHtml += '<div class="line">' + (_i + 1) + '</div>';
    }

    var codeHtml = '';
    for (var _i2 = 0; _i2 < lineLength; _i2++) {
      codeHtml += '<div class="line">' + lineCodes[_i2] + '</div>';
    }

    block.className += ' highlight';
    var figure = document.createElement('figure');
    figure.className = block.className;
    figure.innerHTML = '<table><tbody><tr><td class="gutter"><pre>' + codeLineHtml + '</pre></td><td class="code"><pre>' + codeHtml + '</pre></td></tr></tbody></table>';

    rootElement.parentElement.replaceChild(figure, rootElement);
  }
};

$(document).ready(function () {
  //
});

hljs.initHighlighting();
//hljs.initHighlightingOnLoad()
app.highlight();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9wcm9jZXNzaW5nLXRoZW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxHQUFSLENBQVksTUFBWjs7QUFFQSxJQUFNLE1BQU0sRUFBWjs7QUFFQSxJQUFJLFNBQUosR0FBZ0IsWUFBWTtBQUMxQixNQUFNLFNBQVMsU0FBUyxnQkFBVCxDQUEwQixVQUExQixDQUFmO0FBQ0EsT0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE9BQU8sTUFBM0IsRUFBbUMsR0FBbkMsRUFBd0M7QUFDdEMsUUFBTSxRQUFRLE9BQU8sQ0FBUCxDQUFkO0FBQ0EsUUFBTSxjQUFjLE1BQU0sYUFBMUI7QUFDQSxRQUFNLFlBQVksTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLElBQXRCLENBQWxCO0FBQ0EsUUFBSSxVQUFVLFVBQVUsTUFBVixHQUFtQixDQUE3QixNQUFvQyxFQUF4QyxFQUE0QyxVQUFVLEdBQVY7QUFDNUMsUUFBTSxhQUFhLFVBQVUsTUFBN0I7O0FBRUEsUUFBSSxlQUFlLEVBQW5CO0FBQ0EsU0FBSyxJQUFJLEtBQUksQ0FBYixFQUFnQixLQUFJLFVBQXBCLEVBQWdDLElBQWhDLEVBQXFDO0FBQ25DLDhDQUFxQyxLQUFJLENBQXpDO0FBQ0Q7O0FBRUQsUUFBSSxXQUFXLEVBQWY7QUFDQSxTQUFLLElBQUksTUFBSSxDQUFiLEVBQWdCLE1BQUksVUFBcEIsRUFBZ0MsS0FBaEMsRUFBcUM7QUFDbkMseUNBQWlDLFVBQVUsR0FBVixDQUFqQztBQUNEOztBQUVELFVBQU0sU0FBTixJQUFtQixZQUFuQjtBQUNBLFFBQU0sU0FBUyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFdBQU8sU0FBUCxHQUFtQixNQUFNLFNBQXpCO0FBQ0EsV0FBTyxTQUFQLGtEQUFnRSxZQUFoRSx5Q0FBZ0gsUUFBaEg7O0FBRUEsZ0JBQVksYUFBWixDQUEwQixZQUExQixDQUF1QyxNQUF2QyxFQUErQyxXQUEvQztBQUNEO0FBQ0YsQ0ExQkQ7O0FBNEJBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBWTtBQUM1QjtBQUNELENBRkQ7O0FBSUMsS0FBSyxnQkFBTDtBQUNEO0FBQ0EsSUFBSSxTQUFKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gdmFyIG15bWF0aCA9IHJlcXVpcmUgKCcuL2xpYi9tYXRoLmpzJyk7XG4vL1xuLy8gY29uc29sZS5sb2coXCIyz4AgPSBcIiArIG15bWF0aC5zdW0obXltYXRoLnBpLCBteW1hdGgucGkpKTtcblxuY29uc29sZS5sb2coJ2luaXQnKTtcblxuY29uc3QgYXBwID0ge307XG5cbmFwcC5oaWdobGlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZSBjb2RlJylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBibG9jayA9IGJsb2Nrc1tpXVxuICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gYmxvY2sucGFyZW50RWxlbWVudFxuICAgIGNvbnN0IGxpbmVDb2RlcyA9IGJsb2NrLmlubmVySFRNTC5zcGxpdCgvXFxuLylcbiAgICBpZiAobGluZUNvZGVzW2xpbmVDb2Rlcy5sZW5ndGggLSAxXSA9PT0gJycpIGxpbmVDb2Rlcy5wb3AoKVxuICAgIGNvbnN0IGxpbmVMZW5ndGggPSBsaW5lQ29kZXMubGVuZ3RoXG5cbiAgICBsZXQgY29kZUxpbmVIdG1sID0gJydcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVMZW5ndGg7IGkrKykge1xuICAgICAgY29kZUxpbmVIdG1sICs9IGA8ZGl2IGNsYXNzPVwibGluZVwiPiR7aSArIDF9PC9kaXY+YFxuICAgIH1cblxuICAgIGxldCBjb2RlSHRtbCA9ICcnXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvZGVIdG1sICs9IGA8ZGl2IGNsYXNzPVwibGluZVwiPiR7bGluZUNvZGVzW2ldfTwvZGl2PmBcbiAgICB9XG5cbiAgICBibG9jay5jbGFzc05hbWUgKz0gJyBoaWdobGlnaHQnXG4gICAgY29uc3QgZmlndXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmlndXJlJylcbiAgICBmaWd1cmUuY2xhc3NOYW1lID0gYmxvY2suY2xhc3NOYW1lXG4gICAgZmlndXJlLmlubmVySFRNTCA9IGA8dGFibGU+PHRib2R5Pjx0cj48dGQgY2xhc3M9XCJndXR0ZXJcIj48cHJlPiR7Y29kZUxpbmVIdG1sfTwvcHJlPjwvdGQ+PHRkIGNsYXNzPVwiY29kZVwiPjxwcmU+JHtjb2RlSHRtbH08L3ByZT48L3RkPjwvdHI+PC90Ym9keT48L3RhYmxlPmBcblxuICAgIHJvb3RFbGVtZW50LnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKGZpZ3VyZSwgcm9vdEVsZW1lbnQpXG4gIH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAvL1xufSlcblxuIGhsanMuaW5pdEhpZ2hsaWdodGluZygpXG4vL2hsanMuaW5pdEhpZ2hsaWdodGluZ09uTG9hZCgpXG5hcHAuaGlnaGxpZ2h0KCkiXX0=
