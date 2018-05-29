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
  //Processingtheme._initToc();
});

hljs.initHighlightingOnLoad();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9wcm9jZXNzaW5nLXRoZW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGtCQUFrQixFQUF4Qjs7QUFFQSxnQkFBZ0IsUUFBaEIsR0FBMkIsWUFBWTs7QUFFckMsTUFBTSxZQUFZLEVBQWxCO0FBQ0EsTUFBTSxXQUFXLEVBQUUsV0FBRixDQUFqQjtBQUNBLE1BQU0sY0FBYyxFQUFFLGFBQUYsQ0FBcEI7QUFDQSxNQUFNLGNBQWMsRUFBRSxzQkFBRixDQUFwQjs7QUFFQSxNQUFNLGdCQUFnQixFQUFFLEdBQUYsQ0FBTSxXQUFOLEVBQW1CLFVBQVUsSUFBVixFQUFnQjtBQUN2RCxZQUFRLEdBQVIsQ0FBWSxFQUFFLElBQUYsRUFBUSxNQUFSLEdBQWlCLEdBQTdCO0FBQ0EsV0FBTyxFQUFFLElBQUYsRUFBUSxNQUFSLEdBQWlCLEdBQXhCO0FBQ0QsR0FIcUIsQ0FBdEI7O0FBS0EsTUFBTSw2QkFBNkIsRUFBRSxHQUFGLENBQU0sYUFBTixFQUFxQixVQUFVLE1BQVYsRUFBa0I7QUFDeEUsV0FBTyxTQUFTLFNBQWhCO0FBQ0QsR0FGa0MsQ0FBbkM7O0FBSUEsTUFBTSx1QkFBdUIsU0FBdkIsb0JBQXVCLENBQVUsS0FBVixFQUFpQixNQUFqQixFQUF5QjtBQUNwRCxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUFOLEdBQWUsQ0FBbkMsRUFBc0MsR0FBdEMsRUFBMkM7QUFDekMsVUFBSSxTQUFTLE1BQU0sQ0FBTixDQUFULElBQXFCLFVBQVUsTUFBTSxJQUFJLENBQVYsQ0FBbkMsRUFBaUQsT0FBTyxDQUFQO0FBQ2xEO0FBQ0QsUUFBSSxTQUFTLE1BQU0sTUFBTSxNQUFOLEdBQWUsQ0FBckIsQ0FBYixFQUFzQyxPQUFPLE1BQU0sTUFBTixHQUFlLENBQXRCO0FBQ3RDLFdBQU8sQ0FBQyxDQUFSO0FBQ0QsR0FORDs7QUFRQSxJQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLFlBQVk7QUFDM0IsUUFBTSxZQUFZLEVBQUUsTUFBRixFQUFVLFNBQVYsRUFBbEI7QUFDQSxRQUFNLGlCQUFpQixxQkFBcUIsMEJBQXJCLEVBQWlELFNBQWpELENBQXZCOztBQUVBLE1BQUUsUUFBRixFQUFZLFdBQVosQ0FBd0IsUUFBeEI7QUFDQSxNQUFFLFdBQUYsRUFBZSxXQUFmLENBQTJCLFlBQTNCOztBQUVBLFFBQUksbUJBQW1CLENBQUMsQ0FBeEIsRUFBMkI7QUFDekIsUUFBRSxTQUFTLGNBQVQsQ0FBRixFQUE0QixRQUE1QixDQUFxQyxRQUFyQztBQUNBLFVBQUksV0FBVyxTQUFTLGNBQVQsRUFBeUIsVUFBeEM7QUFDQSxhQUFPLFNBQVMsT0FBVCxLQUFxQixLQUE1QixFQUFtQztBQUNqQyxVQUFFLFFBQUYsRUFBWSxRQUFaLENBQXFCLFlBQXJCO0FBQ0EsbUJBQVcsU0FBUyxVQUFULENBQW9CLFVBQS9CO0FBQ0Q7QUFDRjtBQUNGLEdBZkQ7QUFnQkQsQ0F4Q0Q7O0FBMENBLGdCQUFnQixHQUFoQixHQUFzQixZQUFZO0FBQ2hDLE1BQU0sZUFBZSxTQUFTLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBckI7QUFDQSxNQUFJLGlCQUFpQixJQUFyQixFQUEyQjtBQUN6QixRQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLGlCQUF4QixDQUFaO0FBQ0EsUUFBSSxRQUFRLElBQVosRUFBa0I7QUFDaEI7QUFDQSxtQkFBYSxVQUFiLENBQXdCLFdBQXhCLENBQW9DLFlBQXBDO0FBQ0QsS0FIRCxNQUdPO0FBQ0wsV0FBSyxZQUFMLENBQWtCLEdBQWxCO0FBQ0EsV0FBSyxRQUFMO0FBQ0EsV0FBSyxRQUFMO0FBQ0Q7QUFDRjtBQUNGLENBYkQ7O0FBZUEsZ0JBQWdCLFlBQWhCLEdBQStCLFVBQVUsR0FBVixFQUFlO0FBQzVDO0FBQ0EsTUFBTSxhQUFhLElBQUksUUFBSixDQUFhLENBQWIsQ0FBbkI7QUFDQSxNQUFJLGFBQWEsVUFBakI7QUFDQSxNQUFJLGFBQUo7QUFDQSxTQUFPLFdBQVcsUUFBWCxDQUFvQixNQUFwQixLQUErQixDQUEvQixJQUFvQyxDQUFDLE9BQU8sV0FBVyxRQUFYLENBQW9CLENBQXBCLEVBQXVCLFFBQXZCLENBQWdDLENBQWhDLENBQVIsRUFBNEMsT0FBNUMsS0FBd0QsSUFBbkc7QUFBeUcsaUJBQWEsSUFBYjtBQUF6RyxHQUVBLElBQUksZUFBZSxVQUFuQixFQUErQixJQUFJLFlBQUosQ0FBaUIsVUFBakIsRUFBNkIsVUFBN0I7QUFDaEMsQ0FSRDs7QUFVQSxnQkFBZ0IsUUFBaEIsR0FBMkIsWUFBWTtBQUNyQyxNQUFNLFFBQVEsU0FBUyxnQkFBVCxDQUEwQixnQ0FBMUIsQ0FBZDtBQUNBLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQTFCLEVBQWtDLEdBQWxDO0FBQXVDLFVBQU0sQ0FBTixFQUFTLFNBQVQsSUFBc0IsV0FBdEI7QUFBdkMsR0FFQSxLQUFLLElBQUksTUFBTSxDQUFmLEVBQWtCLE9BQU8sQ0FBekIsRUFBNEIsS0FBNUIsRUFBbUM7QUFDakMsUUFBTSxVQUFVLFNBQVMsZ0JBQVQsQ0FBMEIsb0JBQW9CLEdBQTlDLENBQWhCO0FBQ0EsU0FBSyxJQUFJLEtBQUksQ0FBYixFQUFnQixLQUFJLFFBQVEsTUFBNUIsRUFBb0MsSUFBcEMsRUFBeUM7QUFDdkMsVUFBTSxTQUFTLFFBQVEsRUFBUixDQUFmO0FBQ0EsYUFBTyxTQUFQLGtCQUFnQyxPQUFPLEVBQXZDLGlDQUFxRSxPQUFPLFNBQTVFO0FBQ0Q7QUFDRjtBQUNGLENBWEQ7O0FBY0EsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFZO0FBQzVCLGtCQUFnQixHQUFoQjtBQUNBO0FBQ0QsQ0FIRDs7QUFLQSxLQUFLLHNCQUFMIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgUHJvY2Vzc2luZ3RoZW1lID0ge307XG5cblByb2Nlc3Npbmd0aGVtZS5faW5pdFRvYyA9IGZ1bmN0aW9uICgpIHtcblxuICBjb25zdCBIRUFERVJGSVggPSAzMFxuICBjb25zdCAkdG9jbGluayA9ICQoJy50b2MtbGluaycpXG4gIGNvbnN0ICRoZWFkZXJsaW5rID0gJCgnLmhlYWRlcmxpbmsnKVxuICBjb25zdCAkdG9jTGlua0xpcyA9ICQoJy5wb3N0LXRvYy1jb250ZW50IGxpJylcblxuICBjb25zdCBoZWFkZXJsaW5rVG9wID0gJC5tYXAoJGhlYWRlcmxpbmssIGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgY29uc29sZS5sb2coJChsaW5rKS5vZmZzZXQoKS50b3ApO1xuICAgIHJldHVybiAkKGxpbmspLm9mZnNldCgpLnRvcFxuICB9KVxuXG4gIGNvbnN0IGhlYWRlckxpbmtzT2Zmc2V0Rm9yU2VhcmNoID0gJC5tYXAoaGVhZGVybGlua1RvcCwgZnVuY3Rpb24gKG9mZnNldCkge1xuICAgIHJldHVybiBvZmZzZXQgLSBIRUFERVJGSVhcbiAgfSlcblxuICBjb25zdCBzZWFyY2hBY3RpdmVUb2NJbmRleCA9IGZ1bmN0aW9uIChhcnJheSwgdGFyZ2V0KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGlmICh0YXJnZXQgPiBhcnJheVtpXSAmJiB0YXJnZXQgPD0gYXJyYXlbaSArIDFdKSByZXR1cm4gaVxuICAgIH1cbiAgICBpZiAodGFyZ2V0ID4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV0pIHJldHVybiBhcnJheS5sZW5ndGggLSAxXG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKClcbiAgICBjb25zdCBhY3RpdmVUb2NJbmRleCA9IHNlYXJjaEFjdGl2ZVRvY0luZGV4KGhlYWRlckxpbmtzT2Zmc2V0Rm9yU2VhcmNoLCBzY3JvbGxUb3ApXG5cbiAgICAkKCR0b2NsaW5rKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAkKCR0b2NMaW5rTGlzKS5yZW1vdmVDbGFzcygnaGFzLWFjdGl2ZScpXG5cbiAgICBpZiAoYWN0aXZlVG9jSW5kZXggIT09IC0xKSB7XG4gICAgICAkKCR0b2NsaW5rW2FjdGl2ZVRvY0luZGV4XSkuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICBsZXQgYW5jZXN0b3IgPSAkdG9jbGlua1thY3RpdmVUb2NJbmRleF0ucGFyZW50Tm9kZVxuICAgICAgd2hpbGUgKGFuY2VzdG9yLnRhZ05hbWUgIT09ICdOQVYnKSB7XG4gICAgICAgICQoYW5jZXN0b3IpLmFkZENsYXNzKCdoYXMtYWN0aXZlJylcbiAgICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnROb2RlLnBhcmVudE5vZGVcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG5cblByb2Nlc3Npbmd0aGVtZS50b2MgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHRvY0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LXRvYycpXG4gIGlmICh0b2NDb250YWluZXIgIT09IG51bGwpIHtcbiAgICBjb25zdCB0b2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVGFibGVPZkNvbnRlbnRzJylcbiAgICBpZiAodG9jID09PSBudWxsKSB7XG4gICAgICAvLyB0b2MgPSB0cnVlLCBidXQgdGhlcmUgYXJlIG5vIGhlYWRpbmdzXG4gICAgICB0b2NDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0b2NDb250YWluZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlZmFjdG9yVG9jKHRvYylcbiAgICAgIHRoaXMuX2xpbmtUb2MoKVxuICAgICAgdGhpcy5faW5pdFRvYygpXG4gICAgfVxuICB9XG59XG5cblByb2Nlc3Npbmd0aGVtZS5fcmVmYWN0b3JUb2MgPSBmdW5jdGlvbiAodG9jKSB7XG4gIC8vIHdoZW4gaGVhZGluZ3MgZG8gbm90IHN0YXJ0IHdpdGggYGgxYFxuICBjb25zdCBvbGRUb2NMaXN0ID0gdG9jLmNoaWxkcmVuWzBdXG4gIGxldCBuZXdUb2NMaXN0ID0gb2xkVG9jTGlzdFxuICBsZXQgdGVtcFxuICB3aGlsZSAobmV3VG9jTGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgKHRlbXAgPSBuZXdUb2NMaXN0LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdKS50YWdOYW1lID09PSAnVUwnKSBuZXdUb2NMaXN0ID0gdGVtcFxuXG4gIGlmIChuZXdUb2NMaXN0ICE9PSBvbGRUb2NMaXN0KSB0b2MucmVwbGFjZUNoaWxkKG5ld1RvY0xpc3QsIG9sZFRvY0xpc3QpXG59XG5cblByb2Nlc3Npbmd0aGVtZS5fbGlua1RvYyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjVGFibGVPZkNvbnRlbnRzIGE6Zmlyc3QtY2hpbGQnKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSBsaW5rc1tpXS5jbGFzc05hbWUgKz0gJyB0b2MtbGluaydcblxuICBmb3IgKGxldCBudW0gPSAxOyBudW0gPD0gNjsgbnVtKyspIHtcbiAgICBjb25zdCBoZWFkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3QtY29udGVudD5oJyArIG51bSlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRlcnNbaV1cbiAgICAgIGhlYWRlci5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiMke2hlYWRlci5pZH1cIiBjbGFzcz1cImhlYWRlcmxpbmtcIj48L2E+JHtoZWFkZXIuaW5uZXJIVE1MfWBcbiAgICB9XG4gIH1cbn1cblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIFByb2Nlc3Npbmd0aGVtZS50b2MoKVxuICAvL1Byb2Nlc3Npbmd0aGVtZS5faW5pdFRvYygpO1xufSk7XG5cbmhsanMuaW5pdEhpZ2hsaWdodGluZ09uTG9hZCgpXG4iXX0=
