import axios from "axios";

export const exchangeRates = {
    NGN: 1, USD: 0.00066, // 1 NGN = 0.00066 USD (Updated)
    GBP: 0.00051, // 1 NGN = 0.00051 GBP (Updated)
    EUR: 0.00061, // 1 NGN = 0.00061 EUR (Updated)
    KES: 0.086,    // 1 NGN = 0.086 KSH (Approximate - Check for current rate)
    GHS: 0.015,    // 1 NGN = 0.012 GHS (Approximate - Check for current rate)
}

export function convertPrice(currency, price) {
    price = parseFloat(price);
    let url = 'https://skynet.africa/api/guest/currency/format'
    axios.post(url, {
        price: price,
        code: currency,
        without_currency: true
    }).then(response => {
        console.log(response.data);
        // return response.data;
    })
    const rate = exchangeRates[currency];
    return (price * rate).toFixed(2);
}

export const getLastLogin = () => {
    const date = new Date();
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