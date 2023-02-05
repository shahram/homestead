sap.ui.define(
    [
        'de/jlabs//common/misc/i18n',
    ],
    function (i18n) {
        class BadRequestError extends Error {
            constructor(message = 'badRequestError', stack = '') {
                if (i18n.exists(message)) {
                    message = i18n.translate(message);
                }
                super(message);
                this.name = 'BadRequestError';
                this.stack = stack;
            }
        }

        return BadRequestError;
    }
);
