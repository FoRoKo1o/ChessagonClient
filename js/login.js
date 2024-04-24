document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('[data-mdb-button-init]');
    const errorDiv = document.querySelector('.error');
    
    loginButton.addEventListener('click', function() {
        const emailInput = document.getElementById('typeEmailX').value;
        const passwordInput = document.getElementById('typePasswordX').value;

        // Sprawdzenie czy pola są puste
        if (!emailInput || !passwordInput) {
            errorDiv.textContent = 'Please enter both email and password!';
            return;
        }

        // Przygotowanie danych do wysłania w formacie JSON
        const data = {
            email: emailInput,
            password: passwordInput
        };

        // Wysłanie danych na serwer
        fetch('https://localhost:7085/api/Account/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                printError(response);
                throw new Error('Login failed.'); // Rzucenie błędu w przypadku niepowodzenia logowania
            }
        })
        .then(data => {
            // Obsługa odpowiedzi z serwera w przypadku poprawnego logowania
            errorDiv.textContent = ''; // Wyczyść komunikat błędu
        
            // Zapisz dane użytkownika w localStorage
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('token', data.token);

            // Przekieruj użytkownika na stronę main.html
            window.location.href = 'main.html';
        })
        .catch(error => {
            // Obsługa błędów sieciowych lub błędnej odpowiedzi z serwera
            errorDiv.textContent = error.message;
        });        
    });
});

function printError(response) {
    response.json().then(data => {
        const errorDiv = document.querySelector('.error');
        let errorMessage = '';
        // Iteracja przez błędy i dodanie ich do komunikatu
        for (const key in data.errors) {
            errorMessage += `${data.errors[key][0]}<br>`;
        }
        // Wyświetlenie komunikatu błędów
        errorDiv.innerHTML = errorMessage;
    });
}