function _logMessage(message) {

    var messageLog = document.getElementById('message-log');
    var contents = messageLog.innerHTML;

    contents = contents + message;
    messageLog.innerHTML = contents;
}

function _logWarningMessage(warningMessage) {
    _logMessage('<div class="message message-warning"><i class="message-icon far fa-exclamation-triangle fa-fw"></i> ' + warningMessage + '</div>');
}

function _logSuccessMessage(successMessage) {
    _logMessage('<div class="message message-success"><i class="message-icon far fa-check-circle fa-fw"></i> ' + successMessage + '</div>');
}

function _logErrorMessage(errorMessage) {
    _logMessage('<div class="message message-error"><i class="message-icon far fa-times-hexagon fa-fw"></i> ' + errorMessage + '</div>');
}

function _logoUnprotected() {
	document.getElementById('logo').src = "logo-unprotected.svg";
}

function _logoProtected() {
	document.getElementById('logo').src = "logo-protected.svg";
}

function updateProgress() {

    var progressIndicatorElement = document.getElementById('progress-indicator');
    progressIndicatorElement.innerHTML = '<i class="message-icon far fa-comment-alt-lines fa-fw"></i> All tests completed.';
}

function logOperationalNotice() {
    _logSuccessMessage('LocalCDN is fully operational.');
    _logoProtected();
}

function logUnprotectedNotice() {

    _logWarningMessage('Your browser was able to connect to a blacklisted CDN.');
    _logErrorMessage('LocalCDN is not working as intended.');
    _logoUnprotected();
}

function logUnavailableNotice() {

    _logWarningMessage('The test resource could not be fetched locally or remotely.');
    _logErrorMessage('LocalCDN is not working as intended.');
}

window.onload = function () {

    if (window.jQuery) {

        jQuery.globalEval = function () {};

        $.get('https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js', function (data, status, response) {

            updateProgress('completed');

            if (response.getResponseHeader('cache-control') === 'no-cache') {
                logOperationalNotice();
            } else if (response.getResponseHeader('content-type') === 'application/javascript;charset=UTF-8') {
                logOperationalNotice();
            } else {
                logUnprotectedNotice();
            }

        }).fail(function() {

            updateProgress('completed');
            logOperationalNotice();
        });

    } else {

        updateProgress('completed');
        logUnavailableNotice();
    }
};
