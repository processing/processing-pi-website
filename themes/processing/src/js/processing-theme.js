const Processingtheme = {};

Processingtheme._initToc = function () {

  const HEADERFIX = 30
  const $toclink = $('.toc-link')
  const $headerlink = $('.headerlink')
  const $tocLinkLis = $('.post-toc-content li')

  const headerlinkTop = $.map($headerlink, function (link) {
    return $(link).offset().top
  })

  const headerLinksOffsetForSearch = $.map(headerlinkTop, function (offset) {
    return offset - HEADERFIX
  })

  const searchActiveTocIndex = function (array, target) {
    for (let i = 0; i < array.length - 1; i++) {
      if (target > array[i] && target <= array[i + 1]) return i
    }
    if (target > array[array.length - 1]) return array.length - 1
    return -1
  }

  $(window).scroll(function () {
    const scrollTop = $(window).scrollTop()
    const activeTocIndex = searchActiveTocIndex(headerLinksOffsetForSearch, scrollTop)

    $($toclink).removeClass('active')
    $($tocLinkLis).removeClass('has-active')

    if (activeTocIndex !== -1) {
      $($toclink[activeTocIndex]).addClass('active')
      let ancestor = $toclink[activeTocIndex].parentNode
      while (ancestor.tagName !== 'NAV') {
        $(ancestor).addClass('has-active')
        ancestor = ancestor.parentNode.parentNode
      }
    }
  })
}

Processingtheme.toc = function () {
  const tocContainer = document.getElementById('post-toc')
  if (tocContainer !== null) {
    const toc = document.getElementById('TableOfContents')
    if (toc === null) {
      // toc = true, but there are no headings
      tocContainer.parentNode.removeChild(tocContainer)
    } else {
      this._refactorToc(toc)
      this._linkToc()
      this._initToc()
    }
  }
}

Processingtheme._refactorToc = function (toc) {
  // when headings do not start with `h1`
  const oldTocList = toc.children[0]
  let newTocList = oldTocList
  let temp
  while (newTocList.children.length === 1 && (temp = newTocList.children[0].children[0]).tagName === 'UL') newTocList = temp

  if (newTocList !== oldTocList) toc.replaceChild(newTocList, oldTocList)
}

Processingtheme._linkToc = function () {
  const links = document.querySelectorAll('#TableOfContents a:first-child')
  for (let i = 0; i < links.length; i++) links[i].className += ' toc-link'

  for (let num = 1; num <= 6; num++) {
    const headers = document.querySelectorAll('.post-content>h' + num)
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      header.innerHTML = `<a href="#${header.id}" class="headerlink"></a>${header.innerHTML}`
    }
  }
}


$(document).ready(function () {
  Processingtheme.toc()


// clipboard
  var clipInit = false;
  $('code').each(function() {
    var code = $(this),
      text = code.text();

    if (text.length > 5) {
      if (!clipInit) {
        var text, clip = new ClipboardJS('.copy-to-clipboard', {
          text: function(trigger) {
            text = $(trigger).prev('code').text();
            return text.replace(/^\$\s/gm, '');
          }
        });

        var inPre;
        clip.on('success', function(e) {
          e.clearSelection();
          inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
          $(e.trigger).attr('aria-label', 'Copied to clipboard!').addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
        });

        clip.on('error', function(e) {
          inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
          $(e.trigger).attr('aria-label', fallbackMessage(e.action)).addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
          $(document).one('copy', function(){
            $(e.trigger).attr('aria-label', 'Copied to clipboard!').addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
          });
        });

        clipInit = true;
      }

      code.after('<span class="copy-to-clipboard" title="Copy to clipboard" />');
      code.next('.copy-to-clipboard').on('mouseleave', function() {
        $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
      });
    }
  });
});

hljs.initHighlightingOnLoad();




