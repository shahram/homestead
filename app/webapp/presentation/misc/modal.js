sap.ui.define(
    [
        'sap/m/MessageBox',
        'de/jlabs//common/misc/i18n',
    ],
    function (
        messageBox,
        i18n,
    ) {
        class Modal {
            confirm(message, callback) {
                messageBox.confirm(this._digest(message), {
                    title: i18n.translate('confirmation'),
                    actions: [
                        messageBox.Action.YES,
                        messageBox.Action.CANCEL
                    ],
                    emphasizedAction: messageBox.Action.YES,
                    onClose: (action) => {
                        if (action === 'YES') {
                            callback();
                        }
                    }
                });
            }

            success(message) {
                messageBox.success(this._digest(message));
            }

            error(message) {
                messageBox.error(this._digest(message));
            }

            _digest(message) {
                if (Array.isArray(message)) {
                    let result = '';
                    for (const field of message) {
                        result += this._digest(field);
                    }
                    return result;
                } else if (message instanceof Error) {
                    return message.message + '\n';
                } else {
                    return message + '\n';
                }
            }
        }

        return new Modal();
    }
);
