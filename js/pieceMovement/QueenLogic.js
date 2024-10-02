import { generateRookMoves } from './rookLogic.js';
import { generateBishopMoves } from './bishopLogic.js';

//Quenn moves like rook and bishop combined
export function generateQueenMoves(activeHexagon, possibleMoves) {
    // rook moves
    generateRookMoves(activeHexagon, possibleMoves);

    // bishop moves
    generateBishopMoves(activeHexagon, possibleMoves);
}
