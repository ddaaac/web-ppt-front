import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import "codemirror/theme/darcula.css";
import CodeMirror from "codemirror";
import "codemirror/mode/markdown/markdown";
import CodeMirrorStyle from "./CodeMirrorStyle";
import Presentation from "./Presentation";
import {parse} from "./parse"

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`

const TextArea = styled.textarea`
  display: none;
`;

const Write = ({source, onChange}) => {
  const textArea = useRef(null);
  const [_, setCodeMirror] = useState();

  useEffect(() => {
    const codeMirror = CodeMirror.fromTextArea(
      textArea.current,
      {
        mode: "text/markdown",
        theme: "darcula",
        lineNumbers: true,
      }
    );
    codeMirror.getDoc().setValue(source)
    codeMirror.setSize("100%", "100vh")

    codeMirror.on("change", (editor) => {
      onChange(editor.getValue())
    });

    setCodeMirror(codeMirror);

    return () => {
      codeMirror.toTextArea();
    };
  }, [source])

  return (
    <Container>
      <CodeMirrorStyle/>
      <TextArea ref={textArea}/>
      <Presentation source={parse(source)}/>
    </Container>
  );
}

export default Write;