document.addEventListener('DOMContentLoaded', function() {
    // Pobierz dane z pliku cookie
    const userId = localStorage.getItem('userId');
    const refreshToken = localStorage.getItem('refreshToken');
    const token = localStorage.getItem('token');
    // Wyświetl dane na stronie
    const userDataElement = document.querySelector('.user-data');
    userDataElement.innerHTML = `User ID: ${userId}<br>Refresh Token: ${refreshToken}<br>Token: ${token}`;
});

// Funkcja do pobierania danych z pliku cookie
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}
