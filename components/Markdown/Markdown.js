import React, { Component } from 'react'
import marked from 'marked'
import renderer from './MarkdownRenderer'

class Markdown extends Component {
  state = { markdown: 'ffyffytfyt' }

  render() {
    return (
      <div
        className="Markdown"
        dangerouslySetInnerHTML={{ __html: this.state.markdown }}
      />
    )
  }
}

export default Markdown
