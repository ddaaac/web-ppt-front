import React from 'react';
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const Container = styled.div`
  justify-content: center;
`

const Markdown = ({contents, mode = "Write"}) => {
  if (!contents || !("content" in contents) || !contents.content) {
    return null
  }
  const blocks = contents.content.split(/(^---$)/m)
    .flatMap(slide => slide.split(/(^```[a-z]*\n[\s\S]*?\n```)/m))
    .map((block, index) => ({
      key: index,
      source: block,
    }));
  return (
    <Container mode={mode}>
      {blocks.map((ks) => {
        return <ReactMarkdown
          key={ks.key}
          source={ks.source}
        />
      })}
    </Container>
  )
};

export default Markdown;