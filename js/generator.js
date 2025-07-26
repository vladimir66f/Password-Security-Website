document.addEventListener('DOMContentLoaded', function() {
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    
    const generateBtn = document.getElementById('generate');
    
    const passwordResult = document.getElementById('password-result');
   
    const chars = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    generateBtn.addEventListener('click', function() {
        let length;
        while (true) {
            const lengthInput = prompt('Введите длину пароля (от 8 до 50 символов):', '16');
            if (lengthInput === null) {
                return;
            }
            length = parseInt(lengthInput);
            if (isNaN(length)) {
                alert('Пожалуйста, введите число!');
            } 
            else if (length < 8 || length > 50) {
                alert('Длина пароля должна быть от 8 до 50 символов!');
            } 
            else {
                break;
            }
        }
        const useUppercase = uppercaseCheckbox.checked;
        const useLowercase = lowercaseCheckbox.checked;
        const useNumbers = numbersCheckbox.checked;
        const useSymbols = symbolsCheckbox.checked;

        let charPool = '';

        if (useUppercase) charPool += chars.uppercase;
        if (useLowercase) charPool += chars.lowercase;
        if (useNumbers) charPool += chars.numbers;
        if (useSymbols) charPool += chars.symbols;
        
        if (!charPool) {
            alert('Пожалуйста, выберите хотя бы один тип символов для генерации пароля!');
            return;
        }
        
        let password = '';

        const randomValues = new Uint8Array(length);
        window.crypto.getRandomValues(randomValues);
        for (let i = 0; password.length !== length; i++) {
            const randomIndex = randomValues[i] % charPool.length;
            password += charPool[randomIndex];
        }
        passwordResult.textContent = `${password}`;
    });
});