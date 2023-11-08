import {describe, test} from "@jest/globals";
import {verify} from "approvals/lib/Providers/Jest/JestApprovals";

class GameOfLifeBoard {

    printHexBoard(width: number, height: number): string {
        // The pieces that make up each hex cell
        const top = "\\__/  ";
        const bottom = "/  \\__";

        let grid = '';

        grid = this.printColumn(width, grid, " __   ");
        for (let row = 0; row < Math.ceil(height / 2); row++) {
            grid = this.printColumn(width, grid, bottom);
            grid = this.printColumn(width, grid, top);
        }

        return grid;
    }

    private printColumn(width: number, grid: string, pattern: string) {
        for (let col = 0; col < width; col++) {
            grid += pattern;
        }

        return grid.substring(0, grid.length - 2) + "\n";
    }

    toString() {
        return this.printHexBoard(2, 3);
    }
}

describe("ApprovalTests", () => {

    test("Print game of life board", () => {

        verify(new GameOfLifeBoard());
    });

});
