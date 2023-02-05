/* global QUnit */
QUnit.config.autostart = false;

sap.ui
    .getCore()
    .attachInit(
        function () {
            sap.ui.require(
                [
                    "de/jlabs//test/unit/AllTests"
                ],
                function () {
                    QUnit.start();
                }
            );
        }
    );
