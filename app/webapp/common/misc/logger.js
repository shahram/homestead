sap.ui.define(
    [],
    function () {
        class Logger {
            info(content) {
                console.info(content);
            }

            error(content) {
                console.error(content);
            }
        }

        return new Logger();
    }
);
