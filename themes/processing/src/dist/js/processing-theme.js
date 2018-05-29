(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var Processingtheme = {};

Processingtheme._initToc = function () {

  var HEADERFIX = 30;
  var $toclink = $('.toc-link');
  var $headerlink = $('.headerlink');
  var $tocLinkLis = $('.post-toc-content li');

  var headerlinkTop = $.map($headerlink, function (link) {
    console.log($(link).offset().top);
    return $(link).offset().top;
  });

  var headerLinksOffsetForSearch = $.map(headerlinkTop, function (offset) {
    return offset - HEADERFIX;
  });

  var searchActiveTocIndex = function searchActiveTocIndex(array, target) {
    for (var i = 0; i < array.length - 1; i++) {
      if (target > array[i] && target <= array[i + 1]) return i;
    }
    if (target > array[array.length - 1]) return array.length - 1;
    return -1;
  };

  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var activeTocIndex = searchActiveTocIndex(headerLinksOffsetForSearch, scrollTop);

    $($toclink).removeClass('active');
    $($tocLinkLis).removeClass('has-active');

    if (activeTocIndex !== -1) {
      $($toclink[activeTocIndex]).addClass('active');
      var ancestor = $toclink[activeTocIndex].parentNode;
      while (ancestor.tagName !== 'NAV') {
        $(ancestor).addClass('has-active');
        ancestor = ancestor.parentNode.parentNode;
      }
    }
  });
};

Processingtheme.toc = function () {
  var tocContainer = document.getElementById('post-toc');
  if (tocContainer !== null) {
    var toc = document.getElementById('TableOfContents');
    if (toc === null) {
      // toc = true, but there are no headings
      tocContainer.parentNode.removeChild(tocContainer);
    } else {
      this._refactorToc(toc);
      this._linkToc();
      this._initToc();
    }
  }
};

Processingtheme._refactorToc = function (toc) {
  // when headings do not start with `h1`
  var oldTocList = toc.children[0];
  var newTocList = oldTocList;
  var temp = void 0;
  while (newTocList.children.length === 1 && (temp = newTocList.children[0].children[0]).tagName === 'UL') {
    newTocList = temp;
  }if (newTocList !== oldTocList) toc.replaceChild(newTocList, oldTocList);
};

Processingtheme._linkToc = function () {
  var links = document.querySelectorAll('#TableOfContents a:first-child');
  for (var i = 0; i < links.length; i++) {
    links[i].className += ' toc-link';
  }for (var num = 1; num <= 6; num++) {
    var headers = document.querySelectorAll('.post-content>h' + num);
    for (var _i = 0; _i < headers.length; _i++) {
      var header = headers[_i];
      header.innerHTML = '<a href="#' + header.id + '" class="headerlink"></a>' + header.innerHTML;
    }
  }
};

$(document).ready(function () {
  Processingtheme.toc();
});

hljs.initHighlightingOnLoad();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9wcm9jZXNzaW5nLXRoZW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGtCQUFrQixFQUF4Qjs7QUFFQSxnQkFBZ0IsUUFBaEIsR0FBMkIsWUFBWTs7QUFFckMsTUFBTSxZQUFZLEVBQWxCO0FBQ0EsTUFBTSxXQUFXLEVBQUUsV0FBRixDQUFqQjtBQUNBLE1BQU0sY0FBYyxFQUFFLGFBQUYsQ0FBcEI7QUFDQSxNQUFNLGNBQWMsRUFBRSxzQkFBRixDQUFwQjs7QUFFQSxNQUFNLGdCQUFnQixFQUFFLEdBQUYsQ0FBTSxXQUFOLEVBQW1CLFVBQVUsSUFBVixFQUFnQjtBQUN2RCxZQUFRLEdBQVIsQ0FBWSxFQUFFLElBQUYsRUFBUSxNQUFSLEdBQWlCLEdBQTdCO0FBQ0EsV0FBTyxFQUFFLElBQUYsRUFBUSxNQUFSLEdBQWlCLEdBQXhCO0FBQ0QsR0FIcUIsQ0FBdEI7O0FBS0EsTUFBTSw2QkFBNkIsRUFBRSxHQUFGLENBQU0sYUFBTixFQUFxQixVQUFVLE1BQVYsRUFBa0I7QUFDeEUsV0FBTyxTQUFTLFNBQWhCO0FBQ0QsR0FGa0MsQ0FBbkM7O0FBSUEsTUFBTSx1QkFBdUIsU0FBdkIsb0JBQXVCLENBQVUsS0FBVixFQUFpQixNQUFqQixFQUF5QjtBQUNwRCxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUFOLEdBQWUsQ0FBbkMsRUFBc0MsR0FBdEMsRUFBMkM7QUFDekMsVUFBSSxTQUFTLE1BQU0sQ0FBTixDQUFULElBQXFCLFVBQVUsTUFBTSxJQUFJLENBQVYsQ0FBbkMsRUFBaUQsT0FBTyxDQUFQO0FBQ2xEO0FBQ0QsUUFBSSxTQUFTLE1BQU0sTUFBTSxNQUFOLEdBQWUsQ0FBckIsQ0FBYixFQUFzQyxPQUFPLE1BQU0sTUFBTixHQUFlLENBQXRCO0FBQ3RDLFdBQU8sQ0FBQyxDQUFSO0FBQ0QsR0FORDs7QUFRQSxJQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLFlBQVk7QUFDM0IsUUFBTSxZQUFZLEVBQUUsTUFBRixFQUFVLFNBQVYsRUFBbEI7QUFDQSxRQUFNLGlCQUFpQixxQkFBcUIsMEJBQXJCLEVBQWlELFNBQWpELENBQXZCOztBQUVBLE1BQUUsUUFBRixFQUFZLFdBQVosQ0FBd0IsUUFBeEI7QUFDQSxNQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFlBQTNCOztBQUVBLFFBQUksbUJBQW1CLENBQUMsQ0FBeEIsRUFBMkI7QUFDekIsUUFBRSxTQUFTLGNBQVQsQ0FBRixFQUE0QixRQUE1QixDQUFxQyxRQUFyQztBQUNBLFVBQUksV0FBVyxTQUFTLGNBQVQsRUFBeUIsVUFBeEM7QUFDQSxhQUFPLFNBQVMsT0FBVCxLQUFxQixLQUE1QixFQUFtQztBQUNqQyxVQUFFLFFBQUYsRUFBWSxRQUFaLENBQXFCLFlBQXJCO0FBQ0EsbUJBQVcsU0FBUyxVQUFULENBQW9CLFVBQS9CO0FBQ0Q7QUFDRjtBQUNGLEdBZkQ7QUFnQkQsQ0F4Q0Q7O0FBMENBLGdCQUFnQixHQUFoQixHQUFzQixZQUFZO0FBQ2hDLE1BQU0sZUFBZSxTQUFTLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBckI7QUFDQSxNQUFJLGlCQUFpQixJQUFyQixFQUEyQjtBQUN6QixRQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLGlCQUF4QixDQUFaO0FBQ0EsUUFBSSxRQUFRLElBQVosRUFBa0I7QUFDaEI7QUFDQSxtQkFBYSxVQUFiLENBQXdCLFdBQXhCLENBQW9DLFlBQXBDO0FBQ0QsS0FIRCxNQUdPO0FBQ0wsV0FBSyxZQUFMLENBQWtCLEdBQWxCO0FBQ0EsV0FBSyxRQUFMO0FBQ0EsV0FBSyxRQUFMO0FBQ0Q7QUFDRjtBQUNGLENBYkQ7O0FBZUEsZ0JBQWdCLFlBQWhCLEdBQStCLFVBQVUsR0FBVixFQUFlO0FBQzVDO0FBQ0EsTUFBTSxhQUFhLElBQUksUUFBSixDQUFhLENBQWIsQ0FBbkI7QUFDQSxNQUFJLGFBQWEsVUFBakI7QUFDQSxNQUFJLGFBQUo7QUFDQSxTQUFPLFdBQVcsUUFBWCxDQUFvQixNQUFwQixLQUErQixDQUEvQixJQUFvQyxDQUFDLE9BQU8sV0FBVyxRQUFYLENBQW9CLENBQXBCLEVBQXVCLFFBQXZCLENBQWdDLENBQWhDLENBQVIsRUFBNEMsT0FBNUMsS0FBd0QsSUFBbkc7QUFBeUcsaUJBQWEsSUFBYjtBQUF6RyxHQUVBLElBQUksZUFBZSxVQUFuQixFQUErQixJQUFJLFlBQUosQ0FBaUIsVUFBakIsRUFBNkIsVUFBN0I7QUFDaEMsQ0FSRDs7QUFVQSxnQkFBZ0IsUUFBaEIsR0FBMkIsWUFBWTtBQUNyQyxNQUFNLFFBQVEsU0FBUyxnQkFBVCxDQUEwQixnQ0FBMUIsQ0FBZDtBQUNBLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQTFCLEVBQWtDLEdBQWxDO0FBQXVDLFVBQU0sQ0FBTixFQUFTLFNBQVQsSUFBc0IsV0FBdEI7QUFBdkMsR0FFQSxLQUFLLElBQUksTUFBTSxDQUFmLEVBQWtCLE9BQU8sQ0FBekIsRUFBNEIsS0FBNUIsRUFBbUM7QUFDakMsUUFBTSxVQUFVLFNBQVMsZ0JBQVQsQ0FBMEIsb0JBQW9CLEdBQTlDLENBQWhCO0FBQ0EsU0FBSyxJQUFJLEtBQUksQ0FBYixFQUFnQixLQUFJLFFBQVEsTUFBNUIsRUFBb0MsSUFBcEMsRUFBeUM7QUFDdkMsVUFBTSxTQUFTLFFBQVEsRUFBUixDQUFmO0FBQ0EsYUFBTyxTQUFQLGtCQUFnQyxPQUFPLEVBQXZDLGlDQUFxRSxPQUFPLFNBQTVFO0FBQ0Q7QUFDRjtBQUNGLENBWEQ7O0FBY0EsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFZO0FBQzVCLGtCQUFnQixHQUFoQjtBQUNELENBRkQ7O0FBSUEsS0FBSyxzQkFBTCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IFByb2Nlc3Npbmd0aGVtZSA9IHt9O1xuXG5Qcm9jZXNzaW5ndGhlbWUuX2luaXRUb2MgPSBmdW5jdGlvbiAoKSB7XG5cbiAgY29uc3QgSEVBREVSRklYID0gMzBcbiAgY29uc3QgJHRvY2xpbmsgPSAkKCcudG9jLWxpbmsnKVxuICBjb25zdCAkaGVhZGVybGluayA9ICQoJy5oZWFkZXJsaW5rJylcbiAgY29uc3QgJHRvY0xpbmtMaXMgPSAkKCcucG9zdC10b2MtY29udGVudCBsaScpXG5cbiAgY29uc3QgaGVhZGVybGlua1RvcCA9ICQubWFwKCRoZWFkZXJsaW5rLCBmdW5jdGlvbiAobGluaykge1xuICAgIGNvbnNvbGUubG9nKCQobGluaykub2Zmc2V0KCkudG9wKTtcbiAgICByZXR1cm4gJChsaW5rKS5vZmZzZXQoKS50b3BcbiAgfSlcblxuICBjb25zdCBoZWFkZXJMaW5rc09mZnNldEZvclNlYXJjaCA9ICQubWFwKGhlYWRlcmxpbmtUb3AsIGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICByZXR1cm4gb2Zmc2V0IC0gSEVBREVSRklYXG4gIH0pXG5cbiAgY29uc3Qgc2VhcmNoQWN0aXZlVG9jSW5kZXggPSBmdW5jdGlvbiAoYXJyYXksIHRhcmdldCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBpZiAodGFyZ2V0ID4gYXJyYXlbaV0gJiYgdGFyZ2V0IDw9IGFycmF5W2kgKyAxXSkgcmV0dXJuIGlcbiAgICB9XG4gICAgaWYgKHRhcmdldCA+IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdKSByZXR1cm4gYXJyYXkubGVuZ3RoIC0gMVxuICAgIHJldHVybiAtMVxuICB9XG5cbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpXG4gICAgY29uc3QgYWN0aXZlVG9jSW5kZXggPSBzZWFyY2hBY3RpdmVUb2NJbmRleChoZWFkZXJMaW5rc09mZnNldEZvclNlYXJjaCwgc2Nyb2xsVG9wKVxuXG4gICAgJCgkdG9jbGluaykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgJCgkdG9jTGlua0xpcykucmVtb3ZlQ2xhc3MoJ2hhcy1hY3RpdmUnKVxuXG4gICAgaWYgKGFjdGl2ZVRvY0luZGV4ICE9PSAtMSkge1xuICAgICAgJCgkdG9jbGlua1thY3RpdmVUb2NJbmRleF0pLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgbGV0IGFuY2VzdG9yID0gJHRvY2xpbmtbYWN0aXZlVG9jSW5kZXhdLnBhcmVudE5vZGVcbiAgICAgIHdoaWxlIChhbmNlc3Rvci50YWdOYW1lICE9PSAnTkFWJykge1xuICAgICAgICAkKGFuY2VzdG9yKS5hZGRDbGFzcygnaGFzLWFjdGl2ZScpXG4gICAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50Tm9kZS5wYXJlbnROb2RlXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5Qcm9jZXNzaW5ndGhlbWUudG9jID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCB0b2NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC10b2MnKVxuICBpZiAodG9jQ29udGFpbmVyICE9PSBudWxsKSB7XG4gICAgY29uc3QgdG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RhYmxlT2ZDb250ZW50cycpXG4gICAgaWYgKHRvYyA9PT0gbnVsbCkge1xuICAgICAgLy8gdG9jID0gdHJ1ZSwgYnV0IHRoZXJlIGFyZSBubyBoZWFkaW5nc1xuICAgICAgdG9jQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodG9jQ29udGFpbmVyKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZWZhY3RvclRvYyh0b2MpXG4gICAgICB0aGlzLl9saW5rVG9jKClcbiAgICAgIHRoaXMuX2luaXRUb2MoKVxuICAgIH1cbiAgfVxufVxuXG5Qcm9jZXNzaW5ndGhlbWUuX3JlZmFjdG9yVG9jID0gZnVuY3Rpb24gKHRvYykge1xuICAvLyB3aGVuIGhlYWRpbmdzIGRvIG5vdCBzdGFydCB3aXRoIGBoMWBcbiAgY29uc3Qgb2xkVG9jTGlzdCA9IHRvYy5jaGlsZHJlblswXVxuICBsZXQgbmV3VG9jTGlzdCA9IG9sZFRvY0xpc3RcbiAgbGV0IHRlbXBcbiAgd2hpbGUgKG5ld1RvY0xpc3QuY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmICh0ZW1wID0gbmV3VG9jTGlzdC5jaGlsZHJlblswXS5jaGlsZHJlblswXSkudGFnTmFtZSA9PT0gJ1VMJykgbmV3VG9jTGlzdCA9IHRlbXBcblxuICBpZiAobmV3VG9jTGlzdCAhPT0gb2xkVG9jTGlzdCkgdG9jLnJlcGxhY2VDaGlsZChuZXdUb2NMaXN0LCBvbGRUb2NMaXN0KVxufVxuXG5Qcm9jZXNzaW5ndGhlbWUuX2xpbmtUb2MgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI1RhYmxlT2ZDb250ZW50cyBhOmZpcnN0LWNoaWxkJylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykgbGlua3NbaV0uY2xhc3NOYW1lICs9ICcgdG9jLWxpbmsnXG5cbiAgZm9yIChsZXQgbnVtID0gMTsgbnVtIDw9IDY7IG51bSsrKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0LWNvbnRlbnQ+aCcgKyBudW0pXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBoZWFkZXIgPSBoZWFkZXJzW2ldXG4gICAgICBoZWFkZXIuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjJHtoZWFkZXIuaWR9XCIgY2xhc3M9XCJoZWFkZXJsaW5rXCI+PC9hPiR7aGVhZGVyLmlubmVySFRNTH1gXG4gICAgfVxuICB9XG59XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICBQcm9jZXNzaW5ndGhlbWUudG9jKClcbn0pO1xuXG5obGpzLmluaXRIaWdobGlnaHRpbmdPbkxvYWQoKVxuIl19
