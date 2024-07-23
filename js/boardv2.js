const hexData = [
    { q: 0, r: 0, color: 'black' },
    { q: 1, r: 0, color: 'white' },
    { q: 0, r: 1, color: 'white' },
    { q: 1, r: 1, color: 'black' },
    // Dodaj więcej heksagonów w razie potrzeby
];

document.addEventListener('DOMContentLoaded', () => {
    const hexboardInner = document.querySelector('.hexboard-inner');

    function createHex(color) {
        const hex = document.createElement('div');
        hex.className = `hex ${color}`;
        hexboardInner.appendChild(hex);
    }

    function placeHexes() {
        hexData.forEach(({ color }) => {
            createHex(color);
        });
    }

    placeHexes(); // Wywołanie funkcji
});
