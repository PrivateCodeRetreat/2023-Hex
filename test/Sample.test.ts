import {beforeAll, describe, expect, test} from "@jest/globals";
import {configure} from "approvals";
import {JestReporter} from "approvals/lib/Providers/Jest/JestReporter";
import {verify, verifyAsJson} from "approvals/lib/Providers/Jest/JestApprovals";

class GameOfLifeBoard {

    printHexBoard(width: number, height: number): string {
            // The pieces that make up each hex cell
            const flatTop = ' __ ';
            const topLeft = '/  \\';
            const bottomLeft = '\\__/';

            // The output grid string
            let grid = '';

            // Create the top part of the grid
            for (let row = 0; row < height; row++) {
                let topLine = '';
                let bottomLine = '';

                // Create the offset for the grid
                if (row % 2 !== 0) {
                    topLine += ' ';
                    bottomLine += ' ';
                }

                // Create each cell in the row
                for (let col = 0; col < width; col++) {
                    topLine += flatTop;
                    bottomLine += topLeft + bottomLeft;
                }

                // Remove the last bottomLeft from the bottomLine string
                bottomLine = bottomLine.substring(0, bottomLine.length - bottomLeft.length);

                // Add the completed lines to the grid
                grid += topLine + '\n' + bottomLine + '\n';
            }

            // Remove the last newline character from the grid string
            grid = grid.substring(0, grid.length - 1);

            return grid;
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
