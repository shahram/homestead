sap.ui.define(
    [
        'sap/m/MessageToast',
        'de/jlabs//common/misc/i18n',
    ],
    function (
        MessageToast,
        i18n,
    ) {
        class Toast {
            message(message) {
                const digestedMessage = this._digest(message);
                MessageToast.show(digestedMessage);
            }

            _digest(message) {
                if (typeof message === 'string' && i18n.exists(message)) {
                    return i18n.translate(message);
                } else if (message instanceof Error) {
                    return message.message;
                } else {
                    return message;
                }
            }
        }

        return new Toast();
    }
);
