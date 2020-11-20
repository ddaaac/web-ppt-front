import React, {useEffect, useMemo, useRef, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import fscreen from "fscreen";
import Markdown from "./Markdown";
import {FullScreenStyle} from "./FullScreenStyle";

const Keys = {
  ARROW_RIGHT: "ArrowRight",
  ARROW_LEFT: "ArrowLeft",
  SPACE_BAR: " ",
  ENTER: "Enter",
};

export const FullScreenBlock = styled.div`
  position: absolute;
  top: -9999px;
  left: -9999px;
  font-size: 100%;
  cursor: ${({showCursor}) => (showCursor ? "default" : "none")};
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 600px) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: #fff;
    display: none;
  }
  
  > div#themed {
    position: relative;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 7%;
    font-size: 1.75rem;
    display: flex;
    flex-direction: column;
    
    @media (max-width: 600px) {
      font-size: 1rem;
    }
    
    p.images {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      width: 100%;
      
      .image {
        display: block;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        height: 100%;
        flex: 1;
      }
    }
    
    iframe.youtube {
      flex: 1;
      
      &:only-child {
        position: absolute;
        left: 0;
        top: 5%;
        width: 100%;
        height: 90%;
        
        @media (max-width: 600px) {
          top: 15%;
          height: 70%;
        }
      }
    }
    
    ${({isFirstPage}) => isFirstPage && createGlobalStyle`
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 80%;
      padding: 7%;
      
      h1, h2, h3, h4 {
        border: none;
        padding: 0;
      }
      
      h1 {
        font-size: 4em;
      }
      
      h2 {
        font-size: 2.5em;
        color: #777; 
      }
      
      h3 {
        margin-top: 1em !important; 
      }
    `}
  }
`;


export const FullScreenButton = styled.button`
  background-image: url("/assets/icons/play.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 40px;
  height: 40px;
  border: none;
  position: absolute;
  top: 30px;
  right: 50px;
  z-index: 3;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`;

const Presentation = ({source}) => {
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (showCursor) {
      setTimeout(() => {
        setShowCursor(false);
      }, 2000);
    }
  }, [showCursor]);

  const slideReference = useRef(null);

  const contents = useMemo(() => (
    source.content.split(/^---$/m)
      .filter((slideContent) => slideContent.trim())
  ), [source]);

  const slideExists = (_index) => !!contents[_index];

  const toggleFullScreen = () => {
    if (slideReference.current) {
      fscreen.requestFullscreen(slideReference.current);
      slideReference.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case Keys.ARROW_RIGHT:
      case Keys.SPACE_BAR:
      case Keys.ENTER:
        next();
        break;
      case Keys.ARROW_LEFT:
        prev();
        break;
      default:
        break;
    }
  };

  const next = () => {
    slideExists(index + 1) && setIndex(index + 1);
  };

  const prev = () => {
    slideExists(index - 1) && setIndex(index - 1);
  };

  return (
    <>
      <FullScreenStyle/>
      <FullScreenBlock
        ref={slideReference}
        tabIndex={-1}
        showCursor={showCursor}
        onKeyDown={handleKeyDown}
        onMouseMove={() => setShowCursor(true)}
        isFirstPage={index === 0}
      >
        <Markdown contents={{content: contents[index]}}/>
      </FullScreenBlock>
      <FullScreenButton onClick={toggleFullScreen}/>
    </>
  );
};

export default Presentation;
