sap.ui.define(
    [],
    function () {
        class Layout {
            isScreenSplitted() {
                const model = sap.ui.getCore().getModel('app');
                return model.getProperty('/layout') === 'MidColumnFullScreen';
            }

            changeLayout(style) {
                const model = sap.ui.getCore().getModel('app');
                model.setProperty('/layout', style);
            }
        };

        return new Layout();
    }
);
