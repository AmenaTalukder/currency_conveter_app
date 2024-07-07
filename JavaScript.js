const apiKey = '6bb886f933a124d32a423081'; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;

const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const resultDiv = document.getElementById('result');
const convertButton = document.getElementById('convertButton');

async function fetchCurrencies() {
    try {
        const response = await fetch(`${apiUrl}/USD`);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);
        populateCurrencySelects(currencies);
    } catch (error) {
        console.error('Error fetching currency data:', error);
        alert('Failed to fetch currency data. Please try again later.');
    }
}

function populateCurrencySelects(currencies) {
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = currency;
        option2.value = currency;
        option1.textContent = currency;
        option2.textContent = currency;
        fromCurrencySelect.appendChild(option1);
        toCurrencySelect.appendChild(option2);
    });
}

async function convertCurrency() {
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${fromCurrency}`);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = amount * rate;

        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
        alert('Failed to convert currency. Please try again later.');
    }
}

convertButton.addEventListener('click', convertCurrency);

fetchCurrencies();
