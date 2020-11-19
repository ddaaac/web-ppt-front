import styled from "styled-components"
import React, {useState} from "react";
import Write from "./Write";
import Print from "./Print";

const HContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

function App() {
  const [markdown, setMarkDown] = useState("")

  return (
    <div className="App">
      <HContainer>
        <Write onChange={setMarkDown}/>
        <Print source={markdown}/>
      </HContainer>
    </div>
  );
}

export default App;
