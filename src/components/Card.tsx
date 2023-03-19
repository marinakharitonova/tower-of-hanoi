import React, {useCallback} from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Tower from "./Tower";
import styled from "styled-components";
import CardTop from "./CardTop";
import {useAppState, useDispatch} from "./StateProvider";
import {ActionKind, DiskType} from "../reducers/appReducer";
import CardFooter from "./CardFooter";

/**
 * Card renders the game's area: three towers.
 * Defines methods
 * onDiskDrop, canDiskDrop for the drop area,
 * canDrag for the drag's items
 */
function Card() {
    const {towers, disksCount} = useAppState()
    const dispatch = useDispatch()

    const onDiskDrop = useCallback((disk: DiskType, towerId: number) => {
        dispatch({type: ActionKind.MovedDisk, payload: {towerId, disk}})
        dispatch({type: ActionKind.IncreasedMovesCount})

        if (towerId !== 0 && towers[towerId].length + 1 === disksCount) {
            dispatch({type: ActionKind.SetVictory})
        }
    }, [dispatch, towers, disksCount])

    const canDiskDrop = useCallback((disk: DiskType, towerId: number): boolean => {
        const currentTower = towers[towerId]
        if (!currentTower.length) return true
        return currentTower[0].size > disk.size
    }, [towers])

    const canDrag = (tower: DiskType[], disk: DiskType): boolean => {
        return disk.color === tower[0].color && disk.size === tower[0].size
    }

    return (
        <StyledCard>
            <CardTop/>
            <DndProvider backend={HTML5Backend}>
                <Towers>
                    {towers.map((tower, index) =>
                        <Tower id={index} disks={tower} key={index}
                               onDrop={onDiskDrop} canDrop={canDiskDrop}
                               canDrag={canDrag.bind(null, tower)}
                        />)}
                </Towers>
            </DndProvider>

            <CardFooter disksCount={disksCount}/>
        </StyledCard>
    );
}

const StyledCard = styled.div`{
  box-sizing: border-box;
  width: 1200px;
  background: white;
  border-radius: 30px;
  padding: 20px 40px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  box-shadow: 0 8px 20px rgba(0, 0, 0, .15);
}`

const Towers = styled.div`{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}`

export default Card;