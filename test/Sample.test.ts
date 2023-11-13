import {describe, test} from "@jest/globals";
import {verify} from "approvals/lib/Providers/Jest/JestApprovals";

class GameOfLifeBoard {
    private cells: [number, number][];

    constructor(...tuples: [number, number][]) {
        this.cells = tuples;
    }

    printHexBoard(width: number, height: number, printCoordinates: boolean): string {
        // The pieces that make up each hex cell
        let grid = this.printHeader(width);
        for (let row = 0; row < Math.ceil(height / 2); row++) {
            let oddY = (row + 1) * 2 - 1;
            grid = this.printOddRows(width, grid, oddY, printCoordinates);
            grid = this.printEvenRows(width, grid, oddY + 1, printCoordinates);
        }

        return grid;
    }

    private printHeader(width: number) {
        let grid = '';
        const header = " __   ";
        for (let col = 0; col < width / 2; col++) {
            grid += header;
        }

        return grid.substring(0, grid.length - 2) + "\n";
    }

    private printEvenRows(width: number, grid: string, y: number, printCoordinates: boolean) {
        const empty = "\\__/  ";
        const alive = "\\__/##";

        for (let x = 2; x <= width; x += 2) {
            if (this.isCellAlive([x, y])) {
                console.log(`alive at [${x}, ${y}]`);
                grid += alive
            } else {
                if (printCoordinates) {
                    grid += `\\__/${x % 10}${y % 10}`;
                } else {
                    grid += empty;
                }
            }
        }

        return grid.substring(0, grid.length - 2) + "\n";
    }


    private printOddRows(width: number, grid: string, y: number, printCoordinates: boolean) {
        const empty = "/  \\__";
        const alive = "/##\\__";

        for (let x = 1; x <= width; x += 2) {
            if (this.isCellAlive([x, y])) {
                grid += alive
            } else {
                if (printCoordinates) {
                    grid += `/${x}${y}\\__`;
                } else {
                    grid += empty;
                }
            }
        }

        return grid.substring(0, grid.length - 2) + "\n";
    }

    toString() {
        return this.printHexBoard(10, 10, false);
    }

    private isCellAlive(cell: [number, number]) {
        const formattedString: string = this.cells
            .map(obj => `(${obj})`)
            .reduce((acc, currentString) => acc + ',' + currentString, '');
        console.log("cell toString(): " + formattedString);

        return formattedString.includes(`(${cell})`);
    }

    static getNearNeighbors(center: number[]): [number, number][] {
        let [x, y] = center;
        return [[x - 1, y - 1], [x, y - 2], [x + 1, y - 1], [x + 1, y + 1], [x, y + 2], [x - 1, y + 1]];
    }

    static getSecondNeighbors(center: number[]):  [number, number][] {
        let [x, y] = center;
        return [[x - 2, y], [x - 1, y - 3], [x + 1, y - 3], [x + 2, y], [x + 1, y + 3], [x - 1, y + 3]];
    }
}

describe("ApprovalTests", () => {

    test("Print game of life board", () => {

        verify(new GameOfLifeBoard());
    });

    test("Testing coordinates", () => {

        verify(new GameOfLifeBoard([1, 1], [2, 2], [3, 5], [4, 6]));
        // verify(new GameOfLifeBoard([2, 2], [3, 5], [4, 6]));
    });

    test("Test board with numbers", () => {

        verify(new GameOfLifeBoard().printHexBoard(10, 10, true));
    });

    test("Test near neighbors", () => {
        const center = [3, 5];
        const neighbors = GameOfLifeBoard.getNearNeighbors(center); // cells: [number, number][];
        let board = new GameOfLifeBoard(...neighbors);
        verify(board);
    });

    test("Test second neighbors", () => {
        const center: [number, number] = [3, 5];
        const neighbors = GameOfLifeBoard.getSecondNeighbors(center);
        neighbors.push(center)
        let board = new GameOfLifeBoard(...neighbors);
        verify(board);
    });
});
