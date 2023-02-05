sap.ui.define(
    [
        'de/jlabs//common/misc/i18n',
    ],
    function (i18n) {
        class HttpRequestError extends Error {
            constructor(message = 'httpRequestError', stack = '') {
                if (i18n.exists(message)) {
                    message = i18n.translate(message);
                }
                super(message);
                this.name = 'HttpRequestError';
                this.stack = stack;
            }
        }

        return HttpRequestError;
    }
);
