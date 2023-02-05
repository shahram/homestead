sap.ui.define(
    [
        'de/jlabs//infra/adapters/xsodata',
    ],
    function (
        xsodataAdapter,
    ) {
        class SupplierRepository {
            findById(id) {
                return xsodataAdapter.get(`Suppliers(${id})`);
            }
        }

        return new SupplierRepository();
    }
);
