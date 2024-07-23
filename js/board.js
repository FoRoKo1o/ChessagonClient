const hexData = [
    { q: 0, r: 0, color: 'black' },
    { q: 1.01, r: 0.07, color: 'white' } // Dodany hexagon obok czarnego
];

document.addEventListener('DOMContentLoaded', () => {
    const hexboardInner = document.querySelector('.hexboard-inner');
    const hexWidth = 50; // Szerokość heksagonu
    const hexHeight = Math.sqrt(3) / 2 * hexWidth; // Wysokość heksagonu
    const hexHorizontalSpacing = hexWidth * 3 / 4; // Odległość pozioma między środkami heksagonów
    const hexVerticalSpacing = hexHeight; // Odległość pionowa między środkami heksagonów

    function createHex(x, y, color) {
        const hex = document.createElement('div');
        hex.className = `hex ${color}`;
        hex.style.left = `${x}px`;
        hex.style.top = `${y}px`;
        hexboardInner.appendChild(hex);
    }

    function getHexPosition(q, r) {
        // Obliczanie pozycji heksagonu
        const x = hexHorizontalSpacing * q;
        const y = hexVerticalSpacing * (r + q / 2);
        return { x, y };
    }

    function placeHexes() {
        hexData.forEach(({ q, r, color }) => {
            const { x, y } = getHexPosition(q, r);

            // Środek heksagonu
            const centerX = hexboardInner.clientWidth / 2;
            const centerY = hexboardInner.clientHeight / 2;

            // Przesunięcie heksagonu, aby był w odpowiednim miejscu
            createHex(
                x + centerX - hexWidth / 2,
                y + centerY - hexHeight / 2,
                color
            );
        });
    }

    placeHexes(); // Wywołanie funkcji
});
