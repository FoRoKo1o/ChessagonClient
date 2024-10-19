export function generateKnightMoves(activeHexagon, possibleMoves) {
    const activeId = parseInt(activeHexagon.id);
    const isOddHexagon = activeId % 2 !== 0;
    const fromOddHexagon = [3, 15, -23, -25, -22, -26, 26, 37, 35, 22, 9, -3];
    const fromEvenHexagon = [-37, -26, -15, -3, 22, +23, 25, 26, 3, -9, -35, -22];

    const knightMoves = isOddHexagon ? fromOddHexagon : fromEvenHexagon;

    knightMoves.forEach(moveOffset => {
        const targetId = activeId + moveOffset;
        const targetHexagon = document.getElementById(targetId);

        if (targetHexagon && !targetHexagon.classList.contains('dissabled')) {
            const targetImage = targetHexagon.querySelector('img');

            if (!targetImage || (targetImage.src.includes('black') && activeHexagon.querySelector('img').src.includes('white')) || 
                (targetImage.src.includes('white') && activeHexagon.querySelector('img').src.includes('black'))) {
                possibleMoves.push(targetId);
                
                if (targetImage) {
                    targetHexagon.classList.add('attack');
                }
            }
        }
    });
}
