import React, {memo} from 'react';
import styled from "styled-components";
import Disk from "./Disk";
import {ItemTypes} from "./ItemTypes";
import {useDrop} from "react-dnd";
import {DiskType} from "../reducers/appReducer";

type TowerProps = {
    id: number
    disks: DiskType[]
    onDrop: (disk: DiskType, towerId: number) => void
    canDrop: (disk: DiskType, towerId: number) => boolean
    canDrag: (disk: DiskType) => boolean
}

/**
 * Tower renders the main unit of the game. Represented by the id, consists of discs.
 */
function Tower({disks, id, onDrop, canDrop, canDrag}: TowerProps) {

    const [_, drop] = useDrop(() => ({
        accept: ItemTypes.DISK,
        drop: (item, monitor) => {
            onDrop(item as DiskType, id)
        },
        canDrop: (item, monitor) => {
            return monitor.isOver() && canDrop(item as DiskType, id)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [canDrop, canDrag])

    return (
        <StyledTower ref={drop}>
            {disks.map(disk => <Disk color={disk.color} size={disk.size} key={disk.color + disk.size} canDrag={canDrag}/>)}
            <TowerHandlerVertical/>
            <TowerHandlerHorizontal/>
        </StyledTower>
    );
}

/** Tower styled components */
const StyledTower = styled.div`{
  box-sizing: border-box;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  padding-bottom: 10px;
}`

const TowerHandler = styled.div`{
  background: black;
  border-radius: 20px;
  position: absolute;
  bottom: 0;
}`

const TowerHandlerVertical = styled(TowerHandler)`{
  width: 10px;
  height: 100%;
  left: 0;
  right: 0;
  margin: auto;
  z-index: -1;
}`

const TowerHandlerHorizontal = styled(TowerHandler)`{
  width: 80%;
  height: 10px;
}`

export default memo(Tower);