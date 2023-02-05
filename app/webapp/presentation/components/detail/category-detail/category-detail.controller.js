sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
    ],
    function (
        Controller,
        JSONModel,
    ) {
        class CategoryDetailController extends Controller {
            constructor() {
                super('category-detail');
            }

            async onInit() {
                this.model = new JSONModel();
                this.getView().setModel(this.model, 'categoryDetail');
            }
        }

        return CategoryDetailController;
    }
);
