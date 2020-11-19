import styled from "styled-components"
import React, {useState} from "react";
import Write from "./Write";
import Print from "./Print";

const HContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  font-weight: 400;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
`

function App() {
  const [markdown, setMarkDown] = useState("")

  return (
    <div>
      <HContainer>
        <Write onChange={setMarkDown}/>
        <Print source={markdown}/>
      </HContainer>
    </div>
  );
}

export default App;
