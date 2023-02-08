export const formatDate = (seconds) => {
    const offset = new Date().getTimezoneOffset() * 60;
    var t = new Date(1970, 0, 1);
    t.setSeconds(seconds - offset);
    return t.toString().substring(4, 15);
};

export const formatTime12 = (seconds) => {
    const offset = new Date().getTimezoneOffset() * 60;
    const timeString = new Date((seconds - offset) * 1000)
        .toISOString()
        .substring(11, 16);
    const [hourString, minute] = timeString.split(':');
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ':' + minute + (hour < 12 ? 'am' : 'pm');
};

export const formatTime24 = (seconds) => {
    const offset = new Date().getTimezoneOffset() * 60;
    return new Date((seconds - offset) * 1000).toISOString().substring(11, 16);
};
