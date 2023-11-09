import {describe, test} from "@jest/globals";
import {verify} from "approvals/lib/Providers/Jest/JestApprovals";

class GameOfLifeBoard {
    private cells: [number, number][];
    constructor(...tuples: [number, number][]) {
        this.cells = tuples;
    }

    printHexBoard(width: number, height: number): string {
        // The pieces that make up each hex cell
        const midRow = "\\__/  ";

        let grid = '';

        grid = this.printColumn(width, grid, " __   ");
        for (let row = 0; row < Math.ceil(height / 2); row++) {
            grid = this.printTop(width, grid, row * 2 - 1);
            grid = this.printColumn(width, grid, midRow);
        }

        return grid;
    }

    private printColumn(width: number, grid: string, pattern: string) {
        for (let col = 0; col < width; col++) {
            grid += pattern;
        }

        return grid.substring(0, grid.length - 2) + "\n";
    }

    private printTop(width: number, grid: string, row: number) {
        const empty = "/  \\__";
        const alive = "/##\\__";

        for (let col = 0; col < width; col++) {
            if (this.isCellAlive([col, 1])) {
                grid += alive
            } else {
                grid += empty;
            }
        }

        return grid.substring(0, grid.length - 2) + "\n";
    }

    toString() {
        return this.printHexBoard(5, 10);
    }

    private isCellAlive(cell: [number, number]) {
        
        return cell[0] === 1 && cell[1] === 1;
    }
}

describe("ApprovalTests", () => {

    test("Print game of life board", () => {

        verify(new GameOfLifeBoard());
    });

    test("Testing coordinates", () => {

        verify(new GameOfLifeBoard([1, 1]));
    });
});
