document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('[data-mdb-button-init]');
    
    loginButton.addEventListener('click', function() {
        const emailInput = document.getElementById('typeEmailX').value;
        const passwordInput = document.getElementById('typePasswordX').value;

        // Sprawdzenie czy pola są puste
        if (!emailInput || !passwordInput) {
            alert('Please enter both email and password!');
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
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Obsługa odpowiedzi z serwera
            console.log(data); // Możesz przetwarzać odpowiedź serwera tutaj
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
});
