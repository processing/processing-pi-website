(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9saWIvY29weS5qcyIsImpzL3Byb2Nlc3NpbmctdGhlbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBWTtBQUM3QixHQUFFLGFBQUYsRUFBaUIsS0FBakIsQ0FBdUIsWUFBWTtBQUNsQyxNQUFNLFVBQVUsRUFBRSxnQkFBRixFQUFvQixJQUFwQixFQUFoQjtBQUNBLE1BQU0sV0FBVyxFQUFFLFlBQUYsQ0FBakI7QUFDQSxXQUFTLEdBQVQsQ0FBYSxPQUFiO0FBQ0EsSUFBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixRQUFqQjtBQUNBLFdBQVMsTUFBVDtBQUNBLFdBQVMsV0FBVCxDQUFxQixNQUFyQjtBQUNBLFdBQVMsTUFBVDtBQUNBLEVBUkQ7QUFTQSxDQVZEOzs7OztBQ0FBLElBQU0sa0JBQWtCLEVBQXhCOztBQUVBLGdCQUFnQixRQUFoQixHQUEyQixZQUFZOztBQUVyQyxNQUFNLFlBQVksRUFBbEI7QUFDQSxNQUFNLFdBQVcsRUFBRSxXQUFGLENBQWpCO0FBQ0EsTUFBTSxjQUFjLEVBQUUsYUFBRixDQUFwQjtBQUNBLE1BQU0sY0FBYyxFQUFFLHNCQUFGLENBQXBCOztBQUVBLE1BQU0sZ0JBQWdCLEVBQUUsR0FBRixDQUFNLFdBQU4sRUFBbUIsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZELFdBQU8sRUFBRSxJQUFGLEVBQVEsTUFBUixHQUFpQixHQUF4QjtBQUNELEdBRnFCLENBQXRCOztBQUlBLE1BQU0sNkJBQTZCLEVBQUUsR0FBRixDQUFNLGFBQU4sRUFBcUIsVUFBVSxNQUFWLEVBQWtCO0FBQ3hFLFdBQU8sU0FBUyxTQUFoQjtBQUNELEdBRmtDLENBQW5DOztBQUlBLE1BQU0sdUJBQXVCLFNBQXZCLG9CQUF1QixDQUFVLEtBQVYsRUFBaUIsTUFBakIsRUFBeUI7QUFDcEQsU0FBSyxJQUFJLElBQUks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Q0FBcUUsT0FBTyxTQUE1RTtBQUNEO0FBQ0Y7QUFDRixDQVhEOztBQWNBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBWTtBQUM1QixrQkFBZ0IsR0FBaEI7QUFDRCxDQUZEOztBQUlBLEtBQUssc0JBQUwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblx0JCgnLnNoZWxsLWNvcHknKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zdCBjb21tYW5kID0gJCgnLnNoZWxsLWNvbW1hbmQnKS50ZXh0KCk7XHJcblx0XHRjb25zdCB0ZXh0QXJlYSA9ICQoJzx0ZXh0YXJlYT4nKTtcclxuXHRcdHRleHRBcmVhLnZhbChjb21tYW5kKTtcclxuXHRcdCQoJ2JvZHknKS5hcHBlbmQodGV4dEFyZWEpO1xyXG5cdFx0dGV4dEFyZWEuc2VsZWN0KCk7XHJcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG5cdFx0dGV4dEFyZWEucmVtb3ZlKCk7XHJcblx0fSlcclxufSkiLCJjb25zdCBQcm9jZXNzaW5ndGhlbWUgPSB7fTtcclxuXHJcblByb2Nlc3Npbmd0aGVtZS5faW5pdFRvYyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgY29uc3QgSEVBREVSRklYID0gMzBcclxuICBjb25zdCAkdG9jbGluayA9ICQoJy50b2MtbGluaycpXHJcbiAgY29uc3QgJGhlYWRlcmxpbmsgPSAkKCcuaGVhZGVybGluaycpXHJcbiAgY29uc3QgJHRvY0xpbmtMaXMgPSAkKCcucG9zdC10b2MtY29udGVudCBsaScpXHJcblxyXG4gIGNvbnN0IGhlYWRlcmxpbmtUb3AgPSAkLm1hcCgkaGVhZGVybGluaywgZnVuY3Rpb24gKGxpbmspIHtcclxuICAgIHJldHVybiAkKGxpbmspLm9mZnNldCgpLnRvcFxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IGhlYWRlckxpbmtzT2Zmc2V0Rm9yU2VhcmNoID0gJC5tYXAoaGVhZGVybGlua1RvcCwgZnVuY3Rpb24gKG9mZnNldCkge1xyXG4gICAgcmV0dXJuIG9mZnNldCAtIEhFQURFUkZJWFxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHNlYXJjaEFjdGl2ZVRvY0luZGV4ID0gZnVuY3Rpb24gKGFycmF5LCB0YXJnZXQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgIGlmICh0YXJnZXQgPiBhcnJheVtpXSAmJiB0YXJnZXQgPD0gYXJyYXlbaSArIDFdKSByZXR1cm4gaVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCA+IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdKSByZXR1cm4gYXJyYXkubGVuZ3RoIC0gMVxyXG4gICAgcmV0dXJuIC0xXHJcbiAgfVxyXG5cclxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKVxyXG4gICAgY29uc3QgYWN0aXZlVG9jSW5kZXggPSBzZWFyY2hBY3RpdmVUb2NJbmRleChoZWFkZXJMaW5rc09mZnNldEZvclNlYXJjaCwgc2Nyb2xsVG9wKVxyXG5cclxuICAgICQoJHRvY2xpbmspLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgJCgkdG9jTGlua0xpcykucmVtb3ZlQ2xhc3MoJ2hhcy1hY3RpdmUnKVxyXG5cclxuICAgIGlmIChhY3RpdmVUb2NJbmRleCAhPT0gLTEpIHtcclxuICAgICAgJCgkdG9jbGlua1thY3RpdmVUb2NJbmRleF0pLmFkZENsYXNzKCdhY3RpdmUnKVxyXG4gICAgICBsZXQgYW5jZXN0b3IgPSAkdG9jbGlua1thY3RpdmVUb2NJbmRleF0ucGFyZW50Tm9kZVxyXG4gICAgICB3aGlsZSAoYW5jZXN0b3IudGFnTmFtZSAhPT0gJ05BVicpIHtcclxuICAgICAgICAkKGFuY2VzdG9yKS5hZGRDbGFzcygnaGFzLWFjdGl2ZScpXHJcbiAgICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnROb2RlLnBhcmVudE5vZGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcblByb2Nlc3Npbmd0aGVtZS50b2MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgdG9jQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtdG9jJylcclxuICBpZiAodG9jQ29udGFpbmVyICE9PSBudWxsKSB7XHJcbiAgICBjb25zdCB0b2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVGFibGVPZkNvbnRlbnRzJylcclxuICAgIGlmICh0b2MgPT09IG51bGwpIHtcclxuICAgICAgLy8gdG9jID0gdHJ1ZSwgYnV0IHRoZXJlIGFyZSBubyBoZWFkaW5nc1xyXG4gICAgICB0b2NDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0b2NDb250YWluZXIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9yZWZhY3RvclRvYyh0b2MpXHJcbiAgICAgIHRoaXMuX2xpbmtUb2MoKVxyXG4gICAgICB0aGlzLl9pbml0VG9jKClcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblByb2Nlc3Npbmd0aGVtZS5fcmVmYWN0b3JUb2MgPSBmdW5jdGlvbiAodG9jKSB7XHJcbiAgLy8gd2hlbiBoZWFkaW5ncyBkbyBub3Qgc3RhcnQgd2l0aCBgaDFgXHJcbiAgY29uc3Qgb2xkVG9jTGlzdCA9IHRvYy5jaGlsZHJlblswXVxyXG4gIGxldCBuZXdUb2NMaXN0ID0gb2xkVG9jTGlzdFxyXG4gIGxldCB0ZW1wXHJcbiAgd2hpbGUgKG5ld1RvY0xpc3QuY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmICh0ZW1wID0gbmV3VG9jTGlzdC5jaGlsZHJlblswXS5jaGlsZHJlblswXSkudGFnTmFtZSA9PT0gJ1VMJykgbmV3VG9jTGlzdCA9IHRlbXBcclxuXHJcbiAgaWYgKG5ld1RvY0xpc3QgIT09IG9sZFRvY0xpc3QpIHRvYy5yZXBsYWNlQ2hpbGQobmV3VG9jTGlzdCwgb2xkVG9jTGlzdClcclxufVxyXG5cclxuUHJvY2Vzc2luZ3RoZW1lLl9saW5rVG9jID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI1RhYmxlT2ZDb250ZW50cyBhOmZpcnN0LWNoaWxkJylcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSBsaW5rc1tpXS5jbGFzc05hbWUgKz0gJyB0b2MtbGluaydcclxuXHJcbiAgZm9yIChsZXQgbnVtID0gMTsgbnVtIDw9IDY7IG51bSsrKSB7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3QtY29udGVudD5oJyArIG51bSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBoZWFkZXIgPSBoZWFkZXJzW2ldXHJcbiAgICAgIGhlYWRlci5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiMke2hlYWRlci5pZH1cIiBjbGFzcz1cImhlYWRlcmxpbmtcIj48L2E+JHtoZWFkZXIuaW5uZXJIVE1MfWBcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgUHJvY2Vzc2luZ3RoZW1lLnRvYygpXHJcbn0pO1xyXG5cclxuaGxqcy5pbml0SGlnaGxpZ2h0aW5nT25Mb2FkKClcclxuIl19
