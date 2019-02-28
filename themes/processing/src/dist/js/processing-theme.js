(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
	console.log(true);
	$('.shell-copy').click(function () {
		var command = $('.shell-command').text();
		var textArea = $('<textarea>');
		textArea.val(command);
		$('body').append(textArea);
		textArea.select();
		document.execCommand('copy');
		textArea.remove();
	});
});

},{}],2:[function(require,module,exports){
'use strict';

var Processingtheme = {};

Processingtheme._initToc = function () {

  var HEADERFIX = 30;
  var $toclink = $('.toc-link');
  var $headerlink = $('.headerlink');
  var $tocLinkLis = $('.post-toc-content li');

  var headerlinkTop = $.map($headerlink, function (link) {
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

},{}]},{},[2,1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9saWIvY29weS5qcyIsImpzL3Byb2Nlc3NpbmctdGhlbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBWTtBQUM3QixTQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsR0FBRSxhQUFGLEVBQWlCLEtBQWpCLENBQXVCLFlBQVk7QUFDbEMsTUFBTSxVQUFVLEVBQUUsZ0JBQUYsRUFBb0IsSUFBcEIsRUFBaEI7QUFDQSxNQUFNLFdBQVcsRUFBRSxZQUFGLENBQWpCO0FBQ0EsV0FBUyxHQUFULENBQWEsT0FBYjtBQUNBLElBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsUUFBakI7QUFDQSxXQUFTLE1BQVQ7QUFDQSxXQUFTLFdBQVQsQ0FBcUIsTUFBckI7QUFDQSxXQUFTLE1BQVQ7QUFDQSxFQVJEO0FBU0EsQ0FYRDs7Ozs7QUNBQSxJQUFNLGtCQUFrQixFQUF4Qjs7QUFFQSxnQkFBZ0IsUUFBaEIsR0FBMkIsWUFBWTs7QUFFckMsTUFBTSxZQUFZLEVBQWxCO0FBQ0EsTUFBTSxXQUFXLEVBQUUsV0FBRixDQUFqQjtBQUNBLE1BQU0sY0FBYyxFQUFFLGFBQUYsQ0FBcEI7QUFDQSxNQUFNLGNBQWMsRUFBRSxzQkFBRixDQUFwQjs7QUFFQSxNQUFNLGdCQUFnQixFQUFFLEdBQUYsQ0FBTSxXQUFOLEVBQW1CLFVBQVUsSUFBVixFQUFnQjtBQUN2RCxXQUFPLEVBQUUsSUFBRixFQUFRLE1BQVIsR0FBaUIsR0FBeEI7QUFDRCxHQUZxQixDQUF0Qjs7QUFJQSxNQUFNLDZCQUE2QixFQUFFLEdBQUYsQ0FBTSxhQUFOLEVBQXFCLFVBQVUsTUFBVixFQUFrQjtBQUN4RSxXQUFPLFNBQVMsU0FBaEI7QUFDRCxHQUZrQyxDQUFuQzs7QUFJQSxNQUFNLHVCQUF1QixTQUF2QixvQkFBdUIsQ0FBVSxLQUFWLEVBQWlCLE1BQWpCLEVB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LFNBQVAsa0JBQWdDLE9BQU8sRUFBdkMsaUNBQXFFLE9BQU8sU0FBNUU7QUFDRDtBQUNGO0FBQ0YsQ0FYRDs7QUFjQSxFQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQVk7QUFDNUIsa0JBQWdCLEdBQWhCO0FBQ0QsQ0FGRDs7QUFJQSxLQUFLLHNCQUFMIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cdGNvbnNvbGUubG9nKHRydWUpO1xyXG5cdCQoJy5zaGVsbC1jb3B5JykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdFx0Y29uc3QgY29tbWFuZCA9ICQoJy5zaGVsbC1jb21tYW5kJykudGV4dCgpO1xyXG5cdFx0Y29uc3QgdGV4dEFyZWEgPSAkKCc8dGV4dGFyZWE+Jyk7XHJcblx0XHR0ZXh0QXJlYS52YWwoY29tbWFuZCk7XHJcblx0XHQkKCdib2R5JykuYXBwZW5kKHRleHRBcmVhKTtcclxuXHRcdHRleHRBcmVhLnNlbGVjdCgpO1xyXG5cdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcclxuXHRcdHRleHRBcmVhLnJlbW92ZSgpO1xyXG5cdH0pXHJcbn0pIiwiY29uc3QgUHJvY2Vzc2luZ3RoZW1lID0ge307XHJcblxyXG5Qcm9jZXNzaW5ndGhlbWUuX2luaXRUb2MgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIGNvbnN0IEhFQURFUkZJWCA9IDMwXHJcbiAgY29uc3QgJHRvY2xpbmsgPSAkKCcudG9jLWxpbmsnKVxyXG4gIGNvbnN0ICRoZWFkZXJsaW5rID0gJCgnLmhlYWRlcmxpbmsnKVxyXG4gIGNvbnN0ICR0b2NMaW5rTGlzID0gJCgnLnBvc3QtdG9jLWNvbnRlbnQgbGknKVxyXG5cclxuICBjb25zdCBoZWFkZXJsaW5rVG9wID0gJC5tYXAoJGhlYWRlcmxpbmssIGZ1bmN0aW9uIChsaW5rKSB7XHJcbiAgICByZXR1cm4gJChsaW5rKS5vZmZzZXQoKS50b3BcclxuICB9KVxyXG5cclxuICBjb25zdCBoZWFkZXJMaW5rc09mZnNldEZvclNlYXJjaCA9ICQubWFwKGhlYWRlcmxpbmtUb3AsIGZ1bmN0aW9uIChvZmZzZXQpIHtcclxuICAgIHJldHVybiBvZmZzZXQgLSBIRUFERVJGSVhcclxuICB9KVxyXG5cclxuICBjb25zdCBzZWFyY2hBY3RpdmVUb2NJbmRleCA9IGZ1bmN0aW9uIChhcnJheSwgdGFyZ2V0KSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICBpZiAodGFyZ2V0ID4gYXJyYXlbaV0gJiYgdGFyZ2V0IDw9IGFycmF5W2kgKyAxXSkgcmV0dXJuIGlcclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQgPiBhcnJheVthcnJheS5sZW5ndGggLSAxXSkgcmV0dXJuIGFycmF5Lmxlbmd0aCAtIDFcclxuICAgIHJldHVybiAtMVxyXG4gIH1cclxuXHJcbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKClcclxuICAgIGNvbnN0IGFjdGl2ZVRvY0luZGV4ID0gc2VhcmNoQWN0aXZlVG9jSW5kZXgoaGVhZGVyTGlua3NPZmZzZXRGb3JTZWFyY2gsIHNjcm9sbFRvcClcclxuXHJcbiAgICAkKCR0b2NsaW5rKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICQoJHRvY0xpbmtMaXMpLnJlbW92ZUNsYXNzKCdoYXMtYWN0aXZlJylcclxuXHJcbiAgICBpZiAoYWN0aXZlVG9jSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICQoJHRvY2xpbmtbYWN0aXZlVG9jSW5kZXhdKS5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgICAgbGV0IGFuY2VzdG9yID0gJHRvY2xpbmtbYWN0aXZlVG9jSW5kZXhdLnBhcmVudE5vZGVcclxuICAgICAgd2hpbGUgKGFuY2VzdG9yLnRhZ05hbWUgIT09ICdOQVYnKSB7XHJcbiAgICAgICAgJChhbmNlc3RvcikuYWRkQ2xhc3MoJ2hhcy1hY3RpdmUnKVxyXG4gICAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50Tm9kZS5wYXJlbnROb2RlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5Qcm9jZXNzaW5ndGhlbWUudG9jID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IHRvY0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LXRvYycpXHJcbiAgaWYgKHRvY0NvbnRhaW5lciAhPT0gbnVsbCkge1xyXG4gICAgY29uc3QgdG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RhYmxlT2ZDb250ZW50cycpXHJcbiAgICBpZiAodG9jID09PSBudWxsKSB7XHJcbiAgICAgIC8vIHRvYyA9IHRydWUsIGJ1dCB0aGVyZSBhcmUgbm8gaGVhZGluZ3NcclxuICAgICAgdG9jQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodG9jQ29udGFpbmVyKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fcmVmYWN0b3JUb2ModG9jKVxyXG4gICAgICB0aGlzLl9saW5rVG9jKClcclxuICAgICAgdGhpcy5faW5pdFRvYygpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5Qcm9jZXNzaW5ndGhlbWUuX3JlZmFjdG9yVG9jID0gZnVuY3Rpb24gKHRvYykge1xyXG4gIC8vIHdoZW4gaGVhZGluZ3MgZG8gbm90IHN0YXJ0IHdpdGggYGgxYFxyXG4gIGNvbnN0IG9sZFRvY0xpc3QgPSB0b2MuY2hpbGRyZW5bMF1cclxuICBsZXQgbmV3VG9jTGlzdCA9IG9sZFRvY0xpc3RcclxuICBsZXQgdGVtcFxyXG4gIHdoaWxlIChuZXdUb2NMaXN0LmNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiAodGVtcCA9IG5ld1RvY0xpc3QuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0pLnRhZ05hbWUgPT09ICdVTCcpIG5ld1RvY0xpc3QgPSB0ZW1wXHJcblxyXG4gIGlmIChuZXdUb2NMaXN0ICE9PSBvbGRUb2NMaXN0KSB0b2MucmVwbGFjZUNoaWxkKG5ld1RvY0xpc3QsIG9sZFRvY0xpc3QpXHJcbn1cclxuXHJcblByb2Nlc3Npbmd0aGVtZS5fbGlua1RvYyA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNUYWJsZU9mQ29udGVudHMgYTpmaXJzdC1jaGlsZCcpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykgbGlua3NbaV0uY2xhc3NOYW1lICs9ICcgdG9jLWxpbmsnXHJcblxyXG4gIGZvciAobGV0IG51bSA9IDE7IG51bSA8PSA2OyBudW0rKykge1xyXG4gICAgY29uc3QgaGVhZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0LWNvbnRlbnQ+aCcgKyBudW0pXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgaGVhZGVyID0gaGVhZGVyc1tpXVxyXG4gICAgICBoZWFkZXIuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjJHtoZWFkZXIuaWR9XCIgY2xhc3M9XCJoZWFkZXJsaW5rXCI+PC9hPiR7aGVhZGVyLmlubmVySFRNTH1gXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gIFByb2Nlc3Npbmd0aGVtZS50b2MoKVxyXG59KTtcclxuXHJcbmhsanMuaW5pdEhpZ2hsaWdodGluZ09uTG9hZCgpXHJcbiJdfQ==
