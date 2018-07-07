(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9wcm9jZXNzaW5nLXRoZW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGtCQUFrQixFQUF4Qjs7QUFFQSxnQkFBZ0IsUUFBaEIsR0FBMkIsWUFBWTs7QUFFckMsTUFBTSxZQUFZLEVBQWxCO0FBQ0EsTUFBTSxXQUFXLEVBQUUsV0FBRixDQUFqQjtBQUNBLE1BQU0sY0FBYyxFQUFFLGFBQUYsQ0FBcEI7QUFDQSxNQUFNLGNBQWMsRUFBRSxzQkFBRixDQUFwQjs7QUFFQSxNQUFNLGdCQUFnQixFQUFFLEdBQUYsQ0FBTSxXQUFOLEVBQW1CLFVBQVUsSUFBVixFQUFnQjtBQUN2RCxXQUFPLEVBQUUsSUFBRixFQUFRLE1BQVIsR0FBaUIsR0FBeEI7QUFDRCxHQUZxQixDQUF0Qjs7QUFJQSxNQUFNLDZCQUE2QixFQUFFLEdBQUYsQ0FBTSxhQUFOLEVBQXFCLFVBQVUsTUFBVixFQUFrQjtBQUN4RSxXQUFPLFNBQVMsU0FBaEI7QUFDRCxHQUZrQyxDQUFuQzs7QUFJQSxNQUFNLHVCQUF1QixTQUF2QixvQkFBdUIsQ0FBVSxLQUFWLEVBQWlCLE1BQWpCLEVBQXlCO0FBQ3BELFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQU4sR0FBZSxDQUFuQyxFQUFzQyxHQUF0QyxFQUEyQztBQUN6QyxVQUFJLFNBQVMsTUFBTSxDQUFOLENBQVQsSUFBcUIsVUFBVSxNQUFNLElBQUksQ0FBVixDQUFuQyxFQUFpRCxPQUFPLENBQVA7QUFDbEQ7QUFDRCxRQUFJLFNBQVMsTUFBTSxNQUFNLE1BQU4sR0FBZSxDQUFyQixDQUFiLEVBQXNDLE9BQU8sTUFBTSxNQUFOLEdBQWUsQ0FBdEI7QUFDdEMsV0FBTyxDQUFDLENBQVI7QUFDRCxHQU5EOztBQVFBLElBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBWTtBQUMzQixRQUFNLFlBQVksRUFBRSxNQUFGLEVBQVUsU0FBVixFQUFsQjtBQUNBLFFBQU0saUJBQWlCLHFCQUFxQiwwQkFBckIsRUFBaUQsU0FBakQsQ0FBdkI7O0FBRUEsTUFBRSxRQUFGLEVBQVksV0FBWixDQUF3QixRQUF4QjtBQUNBLE1BQUUsV0FBRixFQUFlLFdBQWYsQ0FBMkIsWUFBM0I7O0FBRUEsUUFBSSxtQkFBbUIsQ0FBQyxDQUF4QixFQUEyQjtBQUN6QixRQUFFLFNBQVMsY0FBVCxDQUFGLEVBQTRCLFFBQTVCLENBQXFDLFFBQXJDO0FBQ0EsVUFBSSxXQUFXLFNBQVMsY0FBVCxFQUF5QixVQUF4QztBQUNBLGFBQU8sU0FBUyxPQUFULEtBQXFCLEtBQTVCLEVBQW1DO0FBQ2pDLFVBQUUsUUFBRixFQUFZLFFBQVosQ0FBcUIsWUFBckI7QUFDQSxtQkFBVyxTQUFTLFVBQVQsQ0FBb0IsVUFBL0I7QUFDRDtBQUNGO0FBQ0YsR0FmRDtBQWdCRCxDQXZDRDs7QUF5Q0EsZ0JBQWdCLEdBQWhCLEdBQXNCLFlBQVk7QUFDaEMsTUFBTSxlQUFlLFNBQVMsY0FBVCxDQUF3QixVQUF4QixDQUFyQjtBQUNBLE1BQUksaUJBQWlCLElBQXJCLEVBQTJCO0FBQ3pCLFFBQU0sTUFBTSxTQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLENBQVo7QUFDQSxRQUFJLFFBQVEsSUFBWixFQUFrQjtBQUNoQjtBQUNBLG1CQUFhLFVBQWIsQ0FBd0IsV0FBeEIsQ0FBb0MsWUFBcEM7QUFDRCxLQUhELE1BR087QUFDTCxXQUFLLFlBQUwsQ0FBa0IsR0FBbEI7QUFDQSxXQUFLLFFBQUw7QUFDQSxXQUFLLFFBQUw7QUFDRDtBQUNGO0FBQ0YsQ0FiRDs7QUFlQSxnQkFBZ0IsWUFBaEIsR0FBK0IsVUFBVSxHQUFWLEVBQWU7QUFDNUM7QUFDQSxNQUFNLGFBQWEsSUFBSSxRQUFKLENBQWEsQ0FBYixDQUFuQjtBQUNBLE1BQUksYUFBYSxVQUFqQjtBQUNBLE1BQUksYUFBSjtBQUNBLFNBQU8sV0FBVyxRQUFYLENBQW9CLE1BQXBCLEtBQStCLENBQS9CLElBQW9DLENBQUMsT0FBTyxXQUFXLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBdUIsUUFBdkIsQ0FBZ0MsQ0FBaEMsQ0FBUixFQUE0QyxPQUE1QyxLQUF3RCxJQUFuRztBQUF5RyxpQkFBYSxJQUFiO0FBQXpHLEdBRUEsSUFBSSxlQUFlLFVBQW5CLEVBQStCLElBQUksWUFBSixDQUFpQixVQUFqQixFQUE2QixVQUE3QjtBQUNoQyxDQVJEOztBQVVBLGdCQUFnQixRQUFoQixHQUEyQixZQUFZO0FBQ3JDLE1BQU0sUUFBUSxTQUFTLGdCQUFULENBQTBCLGdDQUExQixDQUFkO0FBQ0EsT0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQU0sTUFBMUIsRUFBa0MsR0FBbEM7QUFBdUMsVUFBTSxDQUFOLEVBQVMsU0FBVCxJQUFzQixXQUF0QjtBQUF2QyxHQUVBLEtBQUssSUFBSSxNQUFNLENBQWYsRUFBa0IsT0FBTyxDQUF6QixFQUE0QixLQUE1QixFQUFtQztBQUNqQyxRQUFNLFVBQVUsU0FBUyxnQkFBVCxDQUEwQixvQkFBb0IsR0FBOUMsQ0FBaEI7QUFDQSxTQUFLLElBQUksS0FBSSxDQUFiLEVBQWdCLEtBQUksUUFBUSxNQUE1QixFQUFvQyxJQUFwQyxFQUF5QztBQUN2QyxVQUFNLFNBQVMsUUFBUSxFQUFSLENBQWY7QUFDQSxhQUFPLFNBQVAsa0JBQWdDLE9BQU8sRUFBdkMsaUNBQXFFLE9BQU8sU0FBNUU7QUFDRDtBQUNGO0FBQ0YsQ0FYRDs7QUFjQSxFQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQVk7QUFDNUIsa0JBQWdCLEdBQWhCO0FBQ0QsQ0FGRDs7QUFJQSxLQUFLLHNCQUFMIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgUHJvY2Vzc2luZ3RoZW1lID0ge307XG5cblByb2Nlc3Npbmd0aGVtZS5faW5pdFRvYyA9IGZ1bmN0aW9uICgpIHtcblxuICBjb25zdCBIRUFERVJGSVggPSAzMFxuICBjb25zdCAkdG9jbGluayA9ICQoJy50b2MtbGluaycpXG4gIGNvbnN0ICRoZWFkZXJsaW5rID0gJCgnLmhlYWRlcmxpbmsnKVxuICBjb25zdCAkdG9jTGlua0xpcyA9ICQoJy5wb3N0LXRvYy1jb250ZW50IGxpJylcblxuICBjb25zdCBoZWFkZXJsaW5rVG9wID0gJC5tYXAoJGhlYWRlcmxpbmssIGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgcmV0dXJuICQobGluaykub2Zmc2V0KCkudG9wXG4gIH0pXG5cbiAgY29uc3QgaGVhZGVyTGlua3NPZmZzZXRGb3JTZWFyY2ggPSAkLm1hcChoZWFkZXJsaW5rVG9wLCBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgcmV0dXJuIG9mZnNldCAtIEhFQURFUkZJWFxuICB9KVxuXG4gIGNvbnN0IHNlYXJjaEFjdGl2ZVRvY0luZGV4ID0gZnVuY3Rpb24gKGFycmF5LCB0YXJnZXQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgaWYgKHRhcmdldCA+IGFycmF5W2ldICYmIHRhcmdldCA8PSBhcnJheVtpICsgMV0pIHJldHVybiBpXG4gICAgfVxuICAgIGlmICh0YXJnZXQgPiBhcnJheVthcnJheS5sZW5ndGggLSAxXSkgcmV0dXJuIGFycmF5Lmxlbmd0aCAtIDFcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKVxuICAgIGNvbnN0IGFjdGl2ZVRvY0luZGV4ID0gc2VhcmNoQWN0aXZlVG9jSW5kZXgoaGVhZGVyTGlua3NPZmZzZXRGb3JTZWFyY2gsIHNjcm9sbFRvcClcblxuICAgICQoJHRvY2xpbmspLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICQoJHRvY0xpbmtMaXMpLnJlbW92ZUNsYXNzKCdoYXMtYWN0aXZlJylcblxuICAgIGlmIChhY3RpdmVUb2NJbmRleCAhPT0gLTEpIHtcbiAgICAgICQoJHRvY2xpbmtbYWN0aXZlVG9jSW5kZXhdKS5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgIGxldCBhbmNlc3RvciA9ICR0b2NsaW5rW2FjdGl2ZVRvY0luZGV4XS5wYXJlbnROb2RlXG4gICAgICB3aGlsZSAoYW5jZXN0b3IudGFnTmFtZSAhPT0gJ05BVicpIHtcbiAgICAgICAgJChhbmNlc3RvcikuYWRkQ2xhc3MoJ2hhcy1hY3RpdmUnKVxuICAgICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudE5vZGUucGFyZW50Tm9kZVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cblxuUHJvY2Vzc2luZ3RoZW1lLnRvYyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgdG9jQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtdG9jJylcbiAgaWYgKHRvY0NvbnRhaW5lciAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHRvYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUYWJsZU9mQ29udGVudHMnKVxuICAgIGlmICh0b2MgPT09IG51bGwpIHtcbiAgICAgIC8vIHRvYyA9IHRydWUsIGJ1dCB0aGVyZSBhcmUgbm8gaGVhZGluZ3NcbiAgICAgIHRvY0NvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRvY0NvbnRhaW5lcilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVmYWN0b3JUb2ModG9jKVxuICAgICAgdGhpcy5fbGlua1RvYygpXG4gICAgICB0aGlzLl9pbml0VG9jKClcbiAgICB9XG4gIH1cbn1cblxuUHJvY2Vzc2luZ3RoZW1lLl9yZWZhY3RvclRvYyA9IGZ1bmN0aW9uICh0b2MpIHtcbiAgLy8gd2hlbiBoZWFkaW5ncyBkbyBub3Qgc3RhcnQgd2l0aCBgaDFgXG4gIGNvbnN0IG9sZFRvY0xpc3QgPSB0b2MuY2hpbGRyZW5bMF1cbiAgbGV0IG5ld1RvY0xpc3QgPSBvbGRUb2NMaXN0XG4gIGxldCB0ZW1wXG4gIHdoaWxlIChuZXdUb2NMaXN0LmNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiAodGVtcCA9IG5ld1RvY0xpc3QuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0pLnRhZ05hbWUgPT09ICdVTCcpIG5ld1RvY0xpc3QgPSB0ZW1wXG5cbiAgaWYgKG5ld1RvY0xpc3QgIT09IG9sZFRvY0xpc3QpIHRvYy5yZXBsYWNlQ2hpbGQobmV3VG9jTGlzdCwgb2xkVG9jTGlzdClcbn1cblxuUHJvY2Vzc2luZ3RoZW1lLl9saW5rVG9jID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNUYWJsZU9mQ29udGVudHMgYTpmaXJzdC1jaGlsZCcpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIGxpbmtzW2ldLmNsYXNzTmFtZSArPSAnIHRvYy1saW5rJ1xuXG4gIGZvciAobGV0IG51bSA9IDE7IG51bSA8PSA2OyBudW0rKykge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9zdC1jb250ZW50PmgnICsgbnVtKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaGVhZGVyID0gaGVhZGVyc1tpXVxuICAgICAgaGVhZGVyLmlubmVySFRNTCA9IGA8YSBocmVmPVwiIyR7aGVhZGVyLmlkfVwiIGNsYXNzPVwiaGVhZGVybGlua1wiPjwvYT4ke2hlYWRlci5pbm5lckhUTUx9YFxuICAgIH1cbiAgfVxufVxuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgUHJvY2Vzc2luZ3RoZW1lLnRvYygpXG59KTtcblxuaGxqcy5pbml0SGlnaGxpZ2h0aW5nT25Mb2FkKClcbiJdfQ==
