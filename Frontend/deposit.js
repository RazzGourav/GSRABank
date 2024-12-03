// deposit.js
document.addEventListener('DOMContentLoaded', () => {
    const transferForm = document.getElementById('transferForm');

    transferForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('Username').value.trim();
        const amount = document.getElementById('amount').value.trim();

        if (username && amount) {
            const depositCode = generateRandomCode(8);
            alert(`Deposit successful! Your deposit code is: ${depositCode}`);
            transferForm.reset(); // Reset the form
        } else {
            alert('Please fill out all fields.');
        }
    });

    function generateRandomCode(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
});
