sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'de/jlabs//presentation/misc/dialog',
    ],
    function (
        Controller,
        dialog,
    ) {
        class BaseDialog extends Controller {
            constructor(path, data) {
                super(path);
                this._path = path;
                this._data = data;
            }

            cancel() {
                this.close();
            }

            close(callback) {
                dialog.close(this._path, callback);
            }
        }

        return BaseDialog;
    }
);
