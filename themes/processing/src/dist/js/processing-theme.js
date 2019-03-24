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

  // clipboard
  var clipInit = false;
  $('code').each(function () {
    var code = $(this),
        _text = code.text();

    if (_text.length > 10) {
      if (!clipInit) {
        var _text,
            clip = new ClipboardJS('.copy-to-clipboard', {
          text: function text(trigger) {
            _text = $(trigger).prev('code').text();
            return _text.replace(/^\$\s/gm, '');
          }
        });

        var inPre;
        clip.on('success', function (e) {
          e.clearSelection();
          inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
          $(e.trigger).attr('aria-label', 'Copied to clipboard!').addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
        });

        clip.on('error', function (e) {
          inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
          $(e.trigger).attr('aria-label', fallbackMessage(e.action)).addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
          $(document).one('copy', function () {
            $(e.trigger).attr('aria-label', 'Copied to clipboard!').addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
          });
        });

        clipInit = true;
      }

      code.after('<span class="copy-to-clipboard" title="Copy to clipboard" />');
      code.next('.copy-to-clipboard').on('mouseleave', function () {
        $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
      });
    }
  });
});

hljs.initHighlightingOnLoad();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9wcm9jZXNzaW5nLXRoZW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGtCQUFrQixFQUF4Qjs7QUFFQSxnQkFBZ0IsUUFBaEIsR0FBMkIsWUFBWTs7QUFFckMsTUFBTSxZQUFZLEVBQWxCO0FBQ0EsTUFBTSxXQUFXLEVBQUUsV0FBRixDQUFqQjtBQUNBLE1BQU0sY0FBYyxFQUFFLGFBQUYsQ0FBcEI7QUFDQSxNQUFNLGNBQWMsRUFBRSxzQkFBRixDQUFwQjs7QUFFQSxNQUFNLGdCQUFnQixFQUFFLEdBQUYsQ0FBTSxXQUFOLEVBQW1CLFVBQVUsSUFBVixFQUFnQjtBQUN2RCxXQUFPLEVBQUUsSUFBRixFQUFRLE1BQVIsR0FBaUIsR0FBeEI7QUFDRCxHQUZxQixDQUF0Qjs7QUFJQSxNQUFNLDZCQUE2QixFQUFFLEdBQUYsQ0FBTSxhQUFOLEVBQXFCLFVBQVUsTUFBVixFQUFrQjtBQUN4RSxXQUFPLFNBQVMsU0FBaEI7QUFDRCxHQUZrQyxDQUFuQzs7QUFJQSxNQUFNLHVCQUF1QixTQUF2QixvQkFBdUIsQ0FBVSxLQUFWLEVBQWlCLE1BQWpCLEVBQXlCO0FBQ3BELFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQU4sR0FBZSxDQUFuQyxFQUFzQyxHQUF0QyxFQUEyQztBQUN6QyxVQUFJLFNBQVMsTUFBTSxDQUFOLENBQVQsSUFBcUIsVUFBVSxNQUFNLElBQUksQ0FBVixDQUFuQyxFQUFpRCxPQUFPLENBQVA7QUFDbEQ7QUFDRCxRQUFJLFNBQVMsTUFBTSxNQUFNLE1BQU4sR0FBZSxDQUFyQixDQUFiLEVBQXNDLE9BQU8sTUFBTSxNQUFOLEdBQWUsQ0FBdEI7QUFDdEMsV0FBTyxDQUFDLENBQVI7QUFDRCxHQU5EOztBQVFBLElBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBWTtBQUMzQixRQUFNLFlBQVksRUFBRSxNQUFG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RCxXQUFLLEtBQUwsQ0FBVyw4REFBWDtBQUNBLFdBQUssSUFBTCxDQUFVLG9CQUFWLEVBQWdDLEVBQWhDLENBQW1DLFlBQW5DLEVBQWlELFlBQVc7QUFDMUQsVUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLFlBQWIsRUFBMkIsSUFBM0IsRUFBaUMsV0FBakMsQ0FBNkMsc0NBQTdDO0FBQ0QsT0FGRDtBQUdEO0FBQ0YsR0FwQ0Q7QUFxQ0QsQ0EzQ0Q7O0FBNkNBLEtBQUssc0JBQUwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBQcm9jZXNzaW5ndGhlbWUgPSB7fTtcblxuUHJvY2Vzc2luZ3RoZW1lLl9pbml0VG9jID0gZnVuY3Rpb24gKCkge1xuXG4gIGNvbnN0IEhFQURFUkZJWCA9IDMwXG4gIGNvbnN0ICR0b2NsaW5rID0gJCgnLnRvYy1saW5rJylcbiAgY29uc3QgJGhlYWRlcmxpbmsgPSAkKCcuaGVhZGVybGluaycpXG4gIGNvbnN0ICR0b2NMaW5rTGlzID0gJCgnLnBvc3QtdG9jLWNvbnRlbnQgbGknKVxuXG4gIGNvbnN0IGhlYWRlcmxpbmtUb3AgPSAkLm1hcCgkaGVhZGVybGluaywgZnVuY3Rpb24gKGxpbmspIHtcbiAgICByZXR1cm4gJChsaW5rKS5vZmZzZXQoKS50b3BcbiAgfSlcblxuICBjb25zdCBoZWFkZXJMaW5rc09mZnNldEZvclNlYXJjaCA9ICQubWFwKGhlYWRlcmxpbmtUb3AsIGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICByZXR1cm4gb2Zmc2V0IC0gSEVBREVSRklYXG4gIH0pXG5cbiAgY29uc3Qgc2VhcmNoQWN0aXZlVG9jSW5kZXggPSBmdW5jdGlvbiAoYXJyYXksIHRhcmdldCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBpZiAodGFyZ2V0ID4gYXJyYXlbaV0gJiYgdGFyZ2V0IDw9IGFycmF5W2kgKyAxXSkgcmV0dXJuIGlcbiAgICB9XG4gICAgaWYgKHRhcmdldCA+IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdKSByZXR1cm4gYXJyYXkubGVuZ3RoIC0gMVxuICAgIHJldHVybiAtMVxuICB9XG5cbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpXG4gICAgY29uc3QgYWN0aXZlVG9jSW5kZXggPSBzZWFyY2hBY3RpdmVUb2NJbmRleChoZWFkZXJMaW5rc09mZnNldEZvclNlYXJjaCwgc2Nyb2xsVG9wKVxuXG4gICAgJCgkdG9jbGluaykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgJCgkdG9jTGlua0xpcykucmVtb3ZlQ2xhc3MoJ2hhcy1hY3RpdmUnKVxuXG4gICAgaWYgKGFjdGl2ZVRvY0luZGV4ICE9PSAtMSkge1xuICAgICAgJCgkdG9jbGlua1thY3RpdmVUb2NJbmRleF0pLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgbGV0IGFuY2VzdG9yID0gJHRvY2xpbmtbYWN0aXZlVG9jSW5kZXhdLnBhcmVudE5vZGVcbiAgICAgIHdoaWxlIChhbmNlc3Rvci50YWdOYW1lICE9PSAnTkFWJykge1xuICAgICAgICAkKGFuY2VzdG9yKS5hZGRDbGFzcygnaGFzLWFjdGl2ZScpXG4gICAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50Tm9kZS5wYXJlbnROb2RlXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5Qcm9jZXNzaW5ndGhlbWUudG9jID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCB0b2NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC10b2MnKVxuICBpZiAodG9jQ29udGFpbmVyICE9PSBudWxsKSB7XG4gICAgY29uc3QgdG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RhYmxlT2ZDb250ZW50cycpXG4gICAgaWYgKHRvYyA9PT0gbnVsbCkge1xuICAgICAgLy8gdG9jID0gdHJ1ZSwgYnV0IHRoZXJlIGFyZSBubyBoZWFkaW5nc1xuICAgICAgdG9jQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodG9jQ29udGFpbmVyKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZWZhY3RvclRvYyh0b2MpXG4gICAgICB0aGlzLl9saW5rVG9jKClcbiAgICAgIHRoaXMuX2luaXRUb2MoKVxuICAgIH1cbiAgfVxufVxuXG5Qcm9jZXNzaW5ndGhlbWUuX3JlZmFjdG9yVG9jID0gZnVuY3Rpb24gKHRvYykge1xuICAvLyB3aGVuIGhlYWRpbmdzIGRvIG5vdCBzdGFydCB3aXRoIGBoMWBcbiAgY29uc3Qgb2xkVG9jTGlzdCA9IHRvYy5jaGlsZHJlblswXVxuICBsZXQgbmV3VG9jTGlzdCA9IG9sZFRvY0xpc3RcbiAgbGV0IHRlbXBcbiAgd2hpbGUgKG5ld1RvY0xpc3QuY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmICh0ZW1wID0gbmV3VG9jTGlzdC5jaGlsZHJlblswXS5jaGlsZHJlblswXSkudGFnTmFtZSA9PT0gJ1VMJykgbmV3VG9jTGlzdCA9IHRlbXBcblxuICBpZiAobmV3VG9jTGlzdCAhPT0gb2xkVG9jTGlzdCkgdG9jLnJlcGxhY2VDaGlsZChuZXdUb2NMaXN0LCBvbGRUb2NMaXN0KVxufVxuXG5Qcm9jZXNzaW5ndGhlbWUuX2xpbmtUb2MgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI1RhYmxlT2ZDb250ZW50cyBhOmZpcnN0LWNoaWxkJylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykgbGlua3NbaV0uY2xhc3NOYW1lICs9ICcgdG9jLWxpbmsnXG5cbiAgZm9yIChsZXQgbnVtID0gMTsgbnVtIDw9IDY7IG51bSsrKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0LWNvbnRlbnQ+aCcgKyBudW0pXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBoZWFkZXIgPSBoZWFkZXJzW2ldXG4gICAgICBoZWFkZXIuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjJHtoZWFkZXIuaWR9XCIgY2xhc3M9XCJoZWFkZXJsaW5rXCI+PC9hPiR7aGVhZGVyLmlubmVySFRNTH1gXG4gICAgfVxuICB9XG59XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICBQcm9jZXNzaW5ndGhlbWUudG9jKClcblxuXG4vLyBjbGlwYm9hcmRcbiAgdmFyIGNsaXBJbml0ID0gZmFsc2U7XG4gICQoJ2NvZGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb2RlID0gJCh0aGlzKSxcbiAgICAgIHRleHQgPSBjb2RlLnRleHQoKTtcblxuICAgIGlmICh0ZXh0Lmxlbmd0aCA+IDEwKSB7XG4gICAgICBpZiAoIWNsaXBJbml0KSB7XG4gICAgICAgIHZhciB0ZXh0LCBjbGlwID0gbmV3IENsaXBib2FyZEpTKCcuY29weS10by1jbGlwYm9hcmQnLCB7XG4gICAgICAgICAgdGV4dDogZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgICAgICAgdGV4dCA9ICQodHJpZ2dlcikucHJldignY29kZScpLnRleHQoKTtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL15cXCRcXHMvZ20sICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBpblByZTtcbiAgICAgICAgY2xpcC5vbignc3VjY2VzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgaW5QcmUgPSAkKGUudHJpZ2dlcikucGFyZW50KCkucHJvcCgndGFnTmFtZScpID09ICdQUkUnO1xuICAgICAgICAgICQoZS50cmlnZ2VyKS5hdHRyKCdhcmlhLWxhYmVsJywgJ0NvcGllZCB0byBjbGlwYm9hcmQhJykuYWRkQ2xhc3MoJ3Rvb2x0aXBwZWQgdG9vbHRpcHBlZC0nICsgKGluUHJlID8gJ3cnIDogJ3MnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNsaXAub24oJ2Vycm9yJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGluUHJlID0gJChlLnRyaWdnZXIpLnBhcmVudCgpLnByb3AoJ3RhZ05hbWUnKSA9PSAnUFJFJztcbiAgICAgICAgICAkKGUudHJpZ2dlcikuYXR0cignYXJpYS1sYWJlbCcsIGZhbGxiYWNrTWVzc2FnZShlLmFjdGlvbikpLmFkZENsYXNzKCd0b29sdGlwcGVkIHRvb2x0aXBwZWQtJyArIChpblByZSA/ICd3JyA6ICdzJykpO1xuICAgICAgICAgICQoZG9jdW1lbnQpLm9uZSgnY29weScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKGUudHJpZ2dlcikuYXR0cignYXJpYS1sYWJlbCcsICdDb3BpZWQgdG8gY2xpcGJvYXJkIScpLmFkZENsYXNzKCd0b29sdGlwcGVkIHRvb2x0aXBwZWQtJyArIChpblByZSA/ICd3JyA6ICdzJykpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjbGlwSW5pdCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvZGUuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY29weS10by1jbGlwYm9hcmRcIiB0aXRsZT1cIkNvcHkgdG8gY2xpcGJvYXJkXCIgLz4nKTtcbiAgICAgIGNvZGUubmV4dCgnLmNvcHktdG8tY2xpcGJvYXJkJykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5hdHRyKCdhcmlhLWxhYmVsJywgbnVsbCkucmVtb3ZlQ2xhc3MoJ3Rvb2x0aXBwZWQgdG9vbHRpcHBlZC1zIHRvb2x0aXBwZWQtdycpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5obGpzLmluaXRIaWdobGlnaHRpbmdPbkxvYWQoKTtcblxuXG5cblxuIl19
