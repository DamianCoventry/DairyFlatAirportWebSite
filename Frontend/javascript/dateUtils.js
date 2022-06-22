function calcNumDays(booking) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(booking.getLeaveDate());
    const secondDate = new Date(booking.getReturnDate());
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

function toLocaleTime(dateTime, timezone) {
    return new Date(dateTime).toLocaleTimeString([],
                    {
                        timeZone: timezone,
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    });
}

function toLocaleDate(dateTime, timezone) {
    return new Date(dateTime).toLocaleDateString([],
                    {
                        timeZone: timezone,
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                    });
}

function buildTimeHtml(timeString) {
    const re = /(\d+:\d\d\s(AM|PM))\s(.+)/;
    const results = re.exec(timeString);
    if (results != null && results.length > 3) {
        return '<span>' + results[1] + '</span> ' +
               '<small class="text-muted fst-italic" style="font-size: x-small">' + results[3] + '</small>';
    }
    return '';
}
