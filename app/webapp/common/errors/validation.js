sap.ui.define(
    [],
    function () {
        class ValidationError extends Error {
            constructor(fields) {
                super();
                this.fields = fields;
            }

            hasError(key) {
                return Object.keys(this.fields).indexOf(key) !== -1;
            }

            getMessage(key) {
                return this.hasError(key) ? this.fields[key] : '';
            }

            getState(key) {
                return this.hasError(key) ? 'Error' : 'None';
            }
        }

        return ValidationError;
    }
);
