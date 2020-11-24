import React, {useEffect, useMemo, useRef, useState} from "react";
import styled, {css} from "styled-components";
import fscreen from "fscreen";
import Markdown from "./Markdown";
import {FullScreenStyle} from "./FullScreenStyle";
import {useParams, useHistory} from "react-router-dom";
import {createSlide, updateSlide} from "./api";
import {parse} from "./parse"
import github from "./github";

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


    ${github}
    padding: 7%;
    font-size: 1.75rem;
    
    ${({isFirstPage}) => isFirstPage && css`
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

export const SaveButton = styled.button`
  background-image: url("/assets/icons/save.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 40px;
  height: 40px;
  border: none;
  position: absolute;
  top: 30px;
  right: 110px;
  z-index: 3;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`;

const Presentation = ({source}) => {
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const {id} = useParams();
  const history = useHistory()

  useEffect(() => {
    if (showCursor) {
      setTimeout(() => {
        setShowCursor(false);
      }, 2000);
    }
  }, [showCursor]);

  const slideReference = useRef(null);

  const contents = useMemo(() => (
    parse(source).content.split(/^---$/m)
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

  const save = async (markdown) => {
    if (id) {
      updateSlide(id, markdown)
    } else {
      const id = await createSlide(markdown)
      history.push(`${id}`);
    }
    alert("저장되었습니다. Url을 복사해서 사용하면 됩니다.")
  }

  return (
    <>
      <FullScreenStyle/>
      <FullScreenBlock
        id={"them"}
        ref={slideReference}
        tabIndex={-1}
        showCursor={showCursor}
        onKeyDown={handleKeyDown}
        onMouseMove={() => setShowCursor(true)}
        isFirstPage={index === 0}
      >
        <Markdown contents={{content: contents[index]}} mode="Presentation"/>
      </FullScreenBlock>
      <FullScreenButton onClick={toggleFullScreen}/>
      <SaveButton onClick={() => save(source)}/>
    </>
  );
};

export default Presentation;
