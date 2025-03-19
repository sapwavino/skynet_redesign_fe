import store from "@/store/index.js";
/*
 Encode credentials to Base64
 */
export const generateAuthHeaders = (username, password) => {
    return 'Basic ' + btoa(username + ':' + password);
}

export const exchangeRates = {
    NGN: 1,
    USD: 0.00066, // 1 NGN = 0.00066 USD (Updated)
    GBP: 0.00051, // 1 NGN = 0.00051 GBP (Updated)
    EUR: 0.00061, // 1 NGN = 0.00061 EUR (Updated)
    KES: 0.086,    // 1 NGN = 0.086 KSH (Approximate - Check for current rate)
    GHS: 0.015,    // 1 NGN = 0.012 GHS (Approximate - Check for current rate)
}

export function convertPrice(currency, price) {
    price = parseFloat(price);
    const rate = store.state.currencyPairs.find((one) => {
        return one.name === currency;
    }).conversion_rate;
    return (price * rate).toFixed(2);
}

/**
 * Converts an amount from one currency to another.
 * @param {number} amount The amount to convert.
 * @param {string} fromCurrencyCode The currency code to convert from (e.g., 'USD', 'EUR').
 * @param {string} toCurrencyCode The currency code to convert to (e.g., 'NGN', 'USD').
 * @returns {number|null} The converted amount, or null if currency codes are invalid.
 */
export function convertCurrency(amount, fromCurrencyCode, toCurrencyCode) {
    const fromCurrency = store.state.currencyPairs.find(
        (currency) => currency.name === fromCurrencyCode
    );
    const toCurrency = store.state.currencyPairs.find(
        (currency) => currency.name === toCurrencyCode
    );

    if (!fromCurrency || !toCurrency || fromCurrency.conversion_rate === undefined || toCurrency.conversion_rate === undefined) {
        console.error("Invalid currency codes or missing conversion rates.");
        return null;
    }

    // Convert the amount to USD first
    const amountInUSD = amount / fromCurrency.conversion_rate;

    // Convert from USD to the target currency
    return amountInUSD * toCurrency.conversion_rate;
}

/**
 * Converts an amount from a given currency to USD.
 * @param {number} amount The amount to convert.
 * @param {string} fromCurrencyCode The currency code to convert from (e.g., 'NGN', 'EUR').
 * @returns {number|null} The converted amount in USD, or null if the currency code is invalid.
 */
export function convertToUSD(amount, fromCurrencyCode) {
    const fromCurrency = store.state.currencyPairs.find(
        (currency) => currency.name === fromCurrencyCode
    );

    if (!fromCurrency) {
        console.error("Invalid currency code or missing conversion rate for USD conversion.");
        return null;
    }

    return amount / fromCurrency.conversion_rate;
}

export const getLastLogin = () => {
    const date = new Date(JSON.parse(localStorage.getItem('lastLogin')));
    const options = {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-GB', options);

    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const suffix = ["th", "st", "nd", "rd"][(date.getDate() % 10 > 3) ? 0 : (date.getDate() % 10)];
    return formattedDate.replace(/\d+/, `${date.getDate()}${suffix}`) + ` ${hours}:${minutes}${ampm}`;
};

export function getCurrencySymbol(currencyCode) {
    switch (currencyCode) {
        case 'USD':
            return '$';
        case 'NGN':
            return '₦';
        case 'KES':
            return 'KES'; // Or 'S' if you prefer a shorter symbol
        case 'GBP':
            return '£';
        case 'GHS':
            return '₵'; // Or 'GH₵' if you prefer a longer symbol
        default:
            return ''; // Or a default symbol like '¤' or display the currency code
    }
}

/**
 * Formats a number (float or integer) into a comma-separated currency string.
 *
 * @param {number} amount The number to format.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(amount) {

    // Convert the number to a string and split it at the decimal point.
    let [integerPart, decimalPart] = String(amount).split('.');

    // Add commas to the integer part.
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Add the decimal part (if it exists). Pad with zeros if needed.
    decimalPart = decimalPart ? '.' + decimalPart.padEnd(2, '0') : '.00';

    // Return the combined string.
    return integerPart + decimalPart;
}

export function formatNumber(value) {
    let parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export function formatDateWithoutTime(dateString) {
    const dateObj = new Date(dateString);

    if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
    }

    const dayOfWeek = dateObj.toLocaleDateString('en-US', {weekday: 'short'});
    const month = dateObj.toLocaleDateString('en-US', {month: 'short'});
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const timezoneOffset = dateObj.toString().match(/GMT[+-]\d{4}/)[0]; // Extract GMT offset
    const timezoneName = dateObj.toString().match(/\(([^)]+)\)$/)[1]; // Extract timezone name

    return `${dayOfWeek}, ${month} ${day.toString().padStart(2, '0')} ${year} ${timezoneOffset} (${timezoneName})`;
}