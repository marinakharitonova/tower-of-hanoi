import {render, screen} from "@testing-library/react";
import CardFooter from "../CardFooter";

describe('CardFooter component', function () {

    it('should correctly counts number of moves fo 0 disks', function () {
        render(<CardFooter disksCount={0}/>)
        expect(screen.getByText('Minimum number of moves: 0')).toBeInTheDocument()
    })

    it('should correctly counts number of moves fo 3 disks', function () {
        render(<CardFooter disksCount={3}/>)
        expect(screen.getByText('Minimum number of moves: 7')).toBeInTheDocument()
    })

    it('should correctly counts number of moves fo 5 disks', function () {
        render(<CardFooter disksCount={5}/>)
        expect(screen.getByText('Minimum number of moves: 31')).toBeInTheDocument()
    })

    it('should correctly counts number of moves fo 8 disks', function () {
        render(<CardFooter disksCount={8}/>)
        expect(screen.getByText('Minimum number of moves: 255')).toBeInTheDocument()
    })

});