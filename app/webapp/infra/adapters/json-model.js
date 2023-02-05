sap.ui.define(
    [
        'sap/ui/model/json/JSONModel',
    ],
    function (JSONModel) {
        class JsonModelAdapter {
            static get(path, options, isAsync = false) {
                return new Promise((resolve, reject) => {
                    const model = new JSONModel();
                    model.attachRequestCompleted(() => resolve(model.getData()));
                    model.attachRequestFailed(error => reject(error));
                    model.loadData(path, options, isAsync);
                });
            }
        }

        return JsonModelAdapter;
    }
);
