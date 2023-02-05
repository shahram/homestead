sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/BusyIndicator',
        'sap/ui/model/json/JSONModel',
        'de/jlabs//common/misc/logger',
        'de/jlabs//presentation/misc/layout',
        'de/jlabs//presentation/misc/modal',
        'de/jlabs//data/services/find-category-by-id',
        'de/jlabs//data/services/find-product-by-id',
        'de/jlabs//data/services/find-supplier-by-id',
    ],
    function (
        Controller,
        BusyIndicator,
        JSONModel,
        logger,
        layout,
        modal,
        findCategoryByIdService,
        findProductByIdService,
        findSupplierByIdService,
    ) {
        class DetailController extends Controller {
            constructor() {
                super('detail');
            }

            onInit() {
                this.model = new JSONModel();
                this.getView().setModel(this.model, 'detail');
                this.getOwnerComponent()
                    .getRouter()
                    .getRoute('detail')
                    .attachPatternMatched(this.handleRouteMatched, this);
            }

            handleRouteMatched(event) {
                const { id } = event.getParameter('arguments');
                this.loadDetailData(id);
                this.setScreenSplitted();
            }

            async loadDetailData(productId) {
                BusyIndicator.show();
                const product = await this._findProductById(productId);
                if (!product) {
                    BusyIndicator.hide();
                    return this.handleClose();
                }
                const category = await this._findCategoryById(product.categoryId);
                const supplier = await this._findSupplierById(product.supplierId);
                this.setModelData({ product, category, supplier });
                BusyIndicator.hide();
            }

            async _findProductById(id) {
                const product = await findProductByIdService.handle(id);
                if (product.isLeft()) {
                    const error = product.value.getMessage('product');
                    logger.error(error);
                    modal.error(error);
                    return false;
                }
                return product.value;
            }

            async _findCategoryById(id) {
                const category = await findCategoryByIdService.handle(id);
                if (category.isLeft()) {
                    const error = category.value.getMessage('category');
                    logger.error(error);
                    modal.error(error);
                    return false;
                }
                return category.value;
            }

            async _findSupplierById(id) {
                const supplier = await findSupplierByIdService.handle(id);
                if (supplier.isLeft()) {
                    const error = supplier.value.getMessage('supplier');
                    logger.error(error);
                    return false;
                }
                return supplier.value;
            }

            setScreenSplitted() {
                const isScreenSplitted = layout.isScreenSplitted();
                if (!isScreenSplitted) {
                    layout.changeLayout('TwoColumnsMidExpanded');
                }
            }

            setModelData(data) {
                const { product, category, supplier } = data;

                this.model.setData({
                    product,
                    category,
                    supplier,
                });
            }

            handleClose() {
                layout.changeLayout('OneColumn');
                this.getOwnerComponent().getRouter().navTo('list');
            }
        }

        return DetailController;
    }
);
