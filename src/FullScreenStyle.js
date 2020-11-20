import {createGlobalStyle} from "styled-components";

export const FullScreenStyle = (
  createGlobalStyle`
    :-webkit-full-screen {
    width: 100%;
    height: 100%;
  }
  
  :not(:root):fullscreen::backdrop {
    background: #fff;
  }
  `
)