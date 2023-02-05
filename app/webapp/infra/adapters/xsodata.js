sap.ui.define(
    [
        'de/jlabs//common/errors/bad-request',
    ],
    function (
        BadRequestError,
    ) {
        class XsodataAdapter {
            static get(path, props = {}, modelName = undefined) {
                return new Promise((resolve, reject) => {
                    const model = sap.ui.getCore().getModel(modelName);
                    const readParams = this._getReadParams(props);

                    model.read(`/${path}`, {
                        ...readParams,
                        success: response => resolve(response),
                        error: error => reject(error),
                    });
                });
            }

            static post(path, postData, modelName = undefined) {
                return new Promise((resolve, reject) => {
                    const model = sap.ui.getCore().getModel(modelName);
                    model.create(path, postData, {
                        success: response => {
                            resolve(response);
                        },
                        error: error => {
                            reject(error);
                        },
                    });
                });
            }

            static put(path, pathKeys, putData, modelName = undefined) {
                return new Promise((resolve, reject) => {
                    const model = sap.ui.getCore().getModel(modelName);
                    const objectPath = model.createKey(path, pathKeys);

                    model.update(objectPath, putData, {
                        success: response => resolve(response),
                        error: error => reject(error),
                    });
                });
            }

            static delete(path, pathKeys, modelName = undefined) {
                return new Promise((resolve, reject) => {
                    const model = sap.ui.getCore().getModel(modelName);
                    const objectPath = model.createKey(path, pathKeys);
                    model.remove(objectPath, {
                        success: response => resolve(response),
                        error: error => reject(error),
                    });
                });
            }

            static _getReadParams(props) {
                const availableProperties = [
                    'context',
                    'expand',
                    'parameters',
                    'urlParameters',
                    'filters',
                    'sorters',
                    'batchGroupId',
                    'groupId',
                    'updateAggregatedMessages',
                ];
                const params = {};

                for (const availableProperty of availableProperties) {
                    if (props[availableProperty]) {
                        params[availableProperty] = props[availableProperty];
                    }
                }

                return params;
            }

            static _handleBatchResponse(results) {
                const errors = [];

                for (const result of results) {
                    if (!result.__changeResponses) {
                        const status = parseInt(result.statusCode || result.response.statusCode);
                        const body = JSON.parse(result.response.body);
                        const message = body.error.message.value;

                        if (status === 400) {
                            errors.push(new BadRequestError(message));
                        }
                    }
                }

                return {
                    isValid: errors.length === 0,
                    errors,
                };
            }
        }

        return XsodataAdapter;
    }
);
