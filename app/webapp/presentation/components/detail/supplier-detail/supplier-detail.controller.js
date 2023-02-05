sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
    ],
    function (
        Controller,
        JSONModel,
    ) {
        class SupplierDetailController extends Controller {
            constructor() {
                super('property-detail');
            }

            async onInit() {
                this.model = new JSONModel();
                this.getView().setModel(this.model, 'supplierDetail');
            }
        }

        return SupplierDetailController;
    }
);
