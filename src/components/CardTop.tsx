import React from 'react';
import styled from "styled-components";
import {useAppState, useDispatch} from "./StateProvider";
import {ActionKind, MAX_DISKS_COUNT, MIN_DISKS_COUNT} from "../reducers/appReducer";
import Button from "../styledComponents/Button";

/**
 * CardTop renders auxiliary elements of the game:
 * select to select the number of disks,
 * stroke counter,
 * Restart button.
 */

let options: JSX.Element[] = []
for (let i = MIN_DISKS_COUNT; i <= MAX_DISKS_COUNT; i++) {
    options.push(<option value={i} label={i.toString()} key={i}></option>)
}

function CardTop() {
    const {disksCount, movesCount} = useAppState()
    const dispatch = useDispatch()

    const handleDisksCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: ActionKind.ChangedDisksCount, payload: {disksCount: Number(e.target.value)}})
    }

    const handleRestart = () => {
        dispatch({type: ActionKind.RestartedGame})
    }

    return (
        <StyledCardTop>
            <DisksCount>
                <Span>Disks:</Span>
                <Select value={disksCount} onChange={handleDisksCountChange}>
                    {options}
                </Select>
            </DisksCount>

            <CardTopItem>
                <Span>Moves:</Span>
                <NumberOfMoves>{movesCount}</NumberOfMoves>
            </CardTopItem>

            <Buttons>
                <Button onClick={handleRestart} disabled={movesCount === 0}>Restart</Button>
            </Buttons>

        </StyledCardTop>
    );
}

const StyledCardTop = styled.div`{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
}`

const Buttons = styled.div`{
  margin-left: auto;
}`

const Span = styled.span`{
  margin-right: 7px;
  font-size: 1em;
}`

const CardTopItem = styled.div`{
  display: flex;
  align-items: center;
}`

const DisksCount = styled(CardTopItem)`{
  margin-right: auto;
}`

const NumberOfMoves = styled.span`{
  color: palevioletred;
}`

const Select = styled.select`{
  border: 2px solid palevioletred;
  border-radius: 5px;
  padding: 0.25em 1em;
}`

export default CardTop;