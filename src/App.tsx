import React from 'react';
import background from "./assets/images/background.jpg"
import styled from "styled-components";
import Card from "./components/Card";
import StateProvider from "./components/StateProvider";
import Modal from "./components/Modal";
import Lighter from "./styledComponents/Lighter";

function App() {
    return (
        <StateProvider>
            <Wrapper>
                <Modal/>
                <BackgroundLighter/>
                <Title>Tower of Hanoi</Title>

                <Card/>
            </Wrapper>
        </StateProvider>
    );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 1.5em;
  text-align: center;
  background: url(${background}) no-repeat center / cover;
  overflow: hidden;
`;

const BackgroundLighter = styled(Lighter)`
  opacity: 0.3;
`

const Title = styled.h1`
  font-size: 2em;
  line-height: 1.25;
  margin: 36px 0;
  position: relative;
  z-index: 2;
`

export default App;
