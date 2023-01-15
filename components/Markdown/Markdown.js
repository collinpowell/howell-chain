
const Markdown = ({file}) => {
  const state = { markdown: file }

    return (
      <div
        className="Markdown"
        dangerouslySetInnerHTML={{ __html: state.markdown }}
      />
    )
}

export default Markdown
