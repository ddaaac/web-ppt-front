import React, {useEffect, useState} from 'react';
import Write from "./Write";
import Print from "./Print";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {getSlide} from "./api";
import {createTemplate} from "./parse";

const HContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  font-weight: 400;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
`


const All = () => {
  const [markdown, setMarkDown] = useState(createTemplate({title: "제목", author: "발표자", subtitle: "부제목"}))
  const [initial, setInitial] = useState(true)
  const {id} = useParams()

  useEffect(() => {
    const getSlideAsync = async () => {
      setMarkDown(await getSlide(id))
      setInitial(false)
    }
    if (id) {
      getSlideAsync()
    }
  }, [])

  return (
    <HContainer>
      <Write source={markdown} onChange={setMarkDown} initial={initial}/>
      <Print source={markdown}/>
    </HContainer>
  )
}

export default All;