import React from 'react';
import styled from "styled-components";
import Markdown from "./Markdown";
import {parse} from "./parse"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 20px;
  overflow: auto;
`

const Print = ({source}) => {
  const contents = parse(source)
  return (
    <Container>
      <Markdown contents={contents}/>
    </Container>
  )
};

export default Print;