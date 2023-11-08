import {beforeAll, describe, expect, test} from "@jest/globals";
import {configure} from "approvals";
import {JestReporter} from "approvals/lib/Providers/Jest/JestReporter";
import {verify, verifyAsJson} from "approvals/lib/Providers/Jest/JestApprovals";

class GameOfLifeBoard {

    printHexBoard(height: number, width: number): string {
        if (height < 2 || width < 2) {
            return "The height and width must be at least 2.";
        }

        // Initialize an empty string to store the hexagonal board
        let hexagonalBoard = '';

        // Calculate the maximum row width
        const maxRowWidth = width + 2 * (height - 1);

        for (let i = 0; i < height; i++) {
            // Calculate leading spaces, hexagon symbols, and trailing spaces for each row
            const leadingSpaces = Math.abs(height - i - 1);
            const hexagonSymbols = width + 2 * i;
            const trailingSpaces = maxRowWidth - leadingSpaces - hexagonSymbols;

            // Create the row content
            let row = " ".repeat(leadingSpaces);
            row += "o".repeat(hexagonSymbols);
            row += " ".repeat(trailingSpaces);

            // Append the row to the hexagonal board string
            hexagonalBoard += row + '\n';
        }

        return hexagonalBoard;
    }

    toString() {
        return this.printHexBoard(10, 10);
    }
}

describe("ApprovalTests", () => {

    test("Print game of life board", () => {

        verify(new GameOfLifeBoard());
    });

});
