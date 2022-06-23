function showGeneralError(message) {
    errorMessageTitle.innerText = 'Error';
    errorMessageBody.innerText = message;
    showError();
}

function showHttpError(code, json) {
    errorMessageTitle.innerText = 'Error Received';
    errorMessageBody.innerHTML = 'The server returned HTTP code ' + code + '.<BR><BR>' + javascriptObjectToDivs(json);
    showError();
}

function javascriptObjectToDivs(object) {
    let html = '';
    for (var key of Object.keys(object)) {
        html = '<div class="row"><div class="col">' + key + ': ' + object[key] + '</div></div>\r\n';
    }
    return html;
}

function showError() {
    const element = document.getElementById('responseCodePopup');
    const toast = new bootstrap.Toast(element);
    toast.show();
}
