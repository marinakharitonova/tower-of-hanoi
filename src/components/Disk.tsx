import React, {memo} from 'react';
import styled from "styled-components";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./ItemTypes";
import {DiskType} from "../reducers/appReducer";

type DiskProps = {
    color: string
    size: number
    canDrag: (disk: DiskType) => boolean
}

/**
 * Disk component renders a simple part of the tower,
 * represented by a size, a color, and a canDrag method
 * that determines whether the disk can be dragged or not.
 */
function Disk({color, size, canDrag}: DiskProps) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.DISK,
        item: {color, size},
        canDrag: () => {
            return canDrag({color, size})
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }), [canDrag])

    return (
        <StyledDisk ref={drag}
                    color={color}
                    size={size * 25 + 50}
                    style={{opacity: isDragging ? 0 : 1}}
        />
    );
}

/** Disk styled components */
const StyledDisk = styled.div<Omit<DiskProps, 'canDrag'>>`
  width: ${props => props.size}px;
  height: 20px;
  background: ${props => props.color};
  border-radius: 20px;
  border: 1px solid #ededed;
  cursor: pointer;
`

export default memo(Disk);