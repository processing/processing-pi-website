import {Hugotheme} from './hugotheme.js'

import '../css/style.scss'

$(document).ready(function () {
  Hugotheme.backToTop()
  Hugotheme.mobileNavbar()
  Hugotheme.toc()
  Hugotheme.fancybox()
})

hljs.initHighlighting()
Hugotheme.highlight()
