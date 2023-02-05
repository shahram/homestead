sap.ui.define(
    [],
    function () {
        class HttpAdapter {
            static get(path, config = {}) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: path,
                        method: 'GET',
                        headers: config.headers,
                        success: response => resolve(response),
                        error: error => reject(error),
                    });
                });
            }

            static getHeader(path, headerField, config = {}) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: path,
                        method: 'GET',
                        headers: config.headers,
                        success: (data, textStatus, request) => {
                            const responseHeader = request.getResponseHeader(headerField);
                            resolve(responseHeader);
                        },
                        error: error => reject(error),
                    });
                });
            }

            static post(path, postData, config = {}) {
                if (postData instanceof FormData) {
                    return HttpService._postFormData(path, postData, config);
                } else {
                    return HttpService._postJSON(path, postData, config);
                }
            }

            static _postJSON(path, postData, config) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: path,
                        data: JSON.stringify(postData),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        method: 'POST',
                        headers: config.headers || {},
                        success: result => resolve(result),
                        error: error => reject(error),
                    });
                });
            }

            static _postFormData(path, postData, config) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: path,
                        data: postData,
                        processData: false,
                        contentType: false,
                        type: 'POST',
                        headers: config.headers || {},
                        success: result => resolve(result),
                        error: errors => reject(errors),
                    });
                });
            }

            static put(path, putData, config) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: path,
                        data: JSON.stringify(putData),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        method: 'PUT',
                        headers: config.headers || {},
                        success: result => resolve(result),
                        error: error => reject(error),
                    });
                });
            }

            static delete(path, config) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: path,
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        method: 'DELETE',
                        headers: config.headers || {},
                        success: result => resolve(result),
                        error: error => reject(error),
                    });
                });
            }
        }

        return HttpAdapter;
    }
);
