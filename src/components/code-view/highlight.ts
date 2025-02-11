import hljs from 'highlight.js/lib/core'

import lang_css from 'highlight.js/lib/languages/css'
import lang_javascript from 'highlight.js/lib/languages/javascript'
import lang_less from 'highlight.js/lib/languages/less'
import lang_typescript from 'highlight.js/lib/languages/typescript'
import lang_xml from 'highlight.js/lib/languages/xml'

import('highlight.js/styles/stackoverflow-light.css')

export function initial() {
  hljs.registerLanguage('javascript', lang_javascript)
  hljs.registerLanguage('typescript', lang_typescript)
  hljs.registerLanguage('xml', lang_xml)
  hljs.registerLanguage('css', lang_css)
  hljs.registerLanguage('less', lang_less)
}

export function getInstance() {
  return hljs
}
