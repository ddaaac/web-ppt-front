import React from 'react';
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import Markdown from "./Markdown";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Print = ({source}) => {
  return (
    <Container>
      <Markdown source={source}/>
    </Container>
  )
};

export default Print;