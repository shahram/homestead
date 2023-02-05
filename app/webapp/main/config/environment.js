sap.ui.define(
    [],
    function () {
        class Environment {
            static isDevMode() {
                return window.location.origin.includes('localhost');
            }
        }

        return Environment;
    }
);
