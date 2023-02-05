sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'de/jlabs//common/misc/filter-builder',
        'de/jlabs//presentation/misc/filter-label',
        'de/jlabs//presentation/misc/sorter',
        'de/jlabs//presentation/misc/dialog',
    ],
    function (
        Controller,
        JSONModel,
        filterBuilder,
        changeFilterLabels,
        sorter,
        dialog,
    ) {
        class ListController extends Controller {
            constructor() {
                super('list');
            }

            onInit() {
                changeFilterLabels(this.getView().byId('products-filter'));
                this.setViewModel();
            }

            setViewModel() {
                this.model = new JSONModel();
                this.getView().setModel(this.model, 'list');
            }

            applyFilters() {
                const data = this._getFilterData();
                const list = this.getView().byId('products-list');
                const binding = list.getBinding('items');

                const filters = filterBuilder
                    .contains('ProductName', data.product)
                    .equals('SupplierID', data.supplier)
                    .assemble();

                binding.filter(filters);
            }

            clearFilters() {
                const field = this._getFilterFields();

                field.product.setValue('');
                field.supplier.setSelectedKeys([]);
            }

            handleDetailNavigation(event) {
                const source = event.getSource();
                const { ProductID: id } = source.getBindingContext().getObject();
                this.getOwnerComponent().getRouter().navTo('detail', { id });
            }

            handleSort() {
                dialog.open('list-sorter', this, {
                    callback: result => {
                        if (result) {
                            this._sortList(result);
                        }
                    },
                });
            }

            _sortList(result) {
                const view = this.getView();
                const table = view.byId('products-list');
                const items = table.getBinding('items');
                sorter.sort(items, result.key, result.decreasing);
            }

            _getFilterData() {
                const filters = this._getFilterFields();

                return {
                    product: filters.product.getValue().trim(),
                    supplier: filters.supplier.getSelectedKeys(),
                };
            }

            _getFilterFields() {
                return {
                    product: this.getView().byId('product-filter'),
                    supplier: this.getView().byId('supplier-filter'),
                };
            }
        }

        return ListController;
    }
);

