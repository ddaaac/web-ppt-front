import {createGlobalStyle} from "styled-components";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";

const CodeMirrorStyle = (
  createGlobalStyle`
    .CodeMirror {
     font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    }
  `
);

export default CodeMirrorStyle;
