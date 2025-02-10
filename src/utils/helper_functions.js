export const getLastLogin = () => {
    const date = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const suffix = ["th", "st", "nd", "rd"][(date.getDate() % 10 > 3) ? 0 : (date.getDate() % 10)];
    return formattedDate.replace(/\d+/, `${date.getDate()}${suffix}`) + ` ${hours}:${minutes}${ampm}`;
};

