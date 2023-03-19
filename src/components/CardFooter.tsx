import React, {memo} from 'react';
import styled from "styled-components";

type CardFooterProps = {
    disksCount: number
}

/**
 * CardFooter renders information about the minimum number of moves to win.
 */
function CardFooter({disksCount}: CardFooterProps) {

    const countMinimumMoves = (disksCount: number) => {
        let counter = 0

        const hanoi = (n: number, from: string = 'A', to: string = 'B', aux: string = 'C') => {
            if (n === 0) return
            counter++
            hanoi(n - 1, from, aux, to);
            //console.log("Move disk " + n + " from rod " + from + " to rod " + to);
            hanoi(n - 1, aux, to, from);
        }

        hanoi(disksCount)

        return counter
    }

    return <StyledCardFooter>Minimum number of moves: {countMinimumMoves(disksCount)}</StyledCardFooter>
}

const StyledCardFooter = styled.p`{
  font-size: 0.75em;
  text-align: right;
  margin: 50px 0 0;
}`

export default memo(CardFooter);