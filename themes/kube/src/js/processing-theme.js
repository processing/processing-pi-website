// var mymath = require ('./lib/math.js');
//
// console.log("2π = " + mymath.sum(mymath.pi, mymath.pi));

console.log('init');

const app = {};

app.highlight = function () {
  const blocks = document.querySelectorAll('pre code')
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const rootElement = block.parentElement
    const lineCodes = block.innerHTML.split(/\n/)
    if (lineCodes[lineCodes.length - 1] === '') lineCodes.pop()
    const lineLength = lineCodes.length

    let codeLineHtml = ''
    for (let i = 0; i < lineLength; i++) {
      codeLineHtml += `<div class="line">${i + 1}</div>`
    }

    let codeHtml = ''
    for (let i = 0; i < lineLength; i++) {
      codeHtml += `<div class="line">${lineCodes[i]}</div>`
    }

    block.className += ' highlight'
    const figure = document.createElement('figure')
    figure.className = block.className
    figure.innerHTML = `<table><tbody><tr><td class="gutter"><pre>${codeLineHtml}</pre></td><td class="code"><pre>${codeHtml}</pre></td></tr></tbody></table>`

    rootElement.parentElement.replaceChild(figure, rootElement)
  }
}

$(document).ready(function () {
  //
})

hljs.initHighlighting()
app.highlight()