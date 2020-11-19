import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";
import CodeMirror from "codemirror";
import "codemirror/mode/markdown/markdown";


const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const TextArea = styled.textarea`
  display: none;
`;

const Write = ({onChange}) => {
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

    codeMirror.setSize("100%", "100vh")

    codeMirror.on("change", (editor) => {
      onChange(editor.getValue())
    });

    setCodeMirror(codeMirror);

    return () => {
      codeMirror.toTextArea();
    };
  }, [])

  return (
    <Container>
      <TextArea ref={textArea}/>
    </Container>
  );
}

export default Write;