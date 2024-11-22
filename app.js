const form = document.getElementById("currency-form");
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const resultElement = document.getElementById("converted-amount");

// API base URL for currency conversion
const API_BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

// Fetch exchange rates and update the conversion
async function getExchangeRate(fromCurrency, toCurrency) {
    const url = `${API_BASE_URL}${fromCurrency}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Fetch the exchange rate for the selected currencies
        const rate = data.rates[toCurrency];

        // Get the value entered by the user
        const amount = parseFloat(amountInput.value);

        // Convert the amount
        const convertedAmount = (amount * rate).toFixed(2);

        // Update the result text
        resultElement.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        resultElement.innerText = "Error fetching exchange rates.";
        console.error("Error fetching exchange rates:", error);
    }
}

// Handle form submission and fetch conversion
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    getExchangeRate(fromCurrency, toCurrency);
});
