sap.ui.define(
    [
        'de/jlabs//infra/adapters/xsodata',
    ],
    function (
        xsodataAdapter,
    ) {
        class CategoryRepository {
            findById(id) {
                return xsodataAdapter.get(`Categories(${id})`);
            }
        }

        return new CategoryRepository();
    }
);
