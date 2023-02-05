sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
    ],
    function (
        Controller
    ) {
        class AppController extends Controller {
            constructor() {
                super('app');
            }

            onInit() {
                const appModel = sap.ui.getCore().getModel('app');
                this.getView().setModel(appModel, 'app');
            }
        }

        return AppController;
    }
);
