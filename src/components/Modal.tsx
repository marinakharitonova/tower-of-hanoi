import React from 'react';
import styled from "styled-components";
import fireworkImg from '../assets/images/fireworks.gif'
import Button from "../styledComponents/Button";
import Lighter from "../styledComponents/Lighter";
import {ActionKind} from "../reducers/appReducer";
import {useAppState, useDispatch} from "./StateProvider";

function Modal() {
    const dispatch = useDispatch()
    const {isWin} = useAppState()

    const handleClose = () => {
        dispatch({type: ActionKind.RestartedGame})
    }

    return (
        <>
            <ModalLighter isOpen={isWin} data-testid="modal-lighter"/>
            <StyledModal isOpen={isWin} data-testid="modal-window">
                <ModalContent>
                    <ModalText>You won!</ModalText>
                    <img src={fireworkImg} alt="Firework" width={120}/>
                </ModalContent>

                <Button onClick={handleClose}>Close</Button>
            </StyledModal>
        </>

    );
}

const StyledModal = styled.div<{ isOpen: boolean }>`{
  box-sizing: border-box;
  width: 500px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, .15);
  text-align: center;
  position: absolute;
  top: ${props => props.isOpen ? '100px' : '-500px'};
  left: 0;
  right: 0;
  margin: auto;
  z-index: ${props => props.isOpen ? 1001 : -1};
  transition: 0.3s;
}`

const ModalText = styled.p`{
  font-size: 1.5em;
  margin-right: 20px;
}`

const ModalLighter = styled(Lighter)<{ isOpen: boolean }>`
  opacity: 0.5;
  z-index: ${props => props.isOpen ? 1000 : -1};
`

const ModalContent = styled.div`{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}`

export default Modal;