import React from 'react';
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const Container = styled.div`
  justify-content: center;
  padding: 40px;
`

const Markdown = ({contents}) => {
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
    <Container>
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