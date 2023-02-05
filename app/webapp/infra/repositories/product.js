sap.ui.define(
    [
        'de/jlabs//infra/adapters/xsodata',
        'de/jlabs//infra/adapters/http',
    ],
    function (
        xsodataAdapter,
        httpAdapter,
    ) {
        class ProductRepository {
            findById(id) {
                return xsodataAdapter.get(`Products(${id})`);
            }

            async createProduct(product) {
                const { value } = await httpAdapter.post('/Products', product);
                return value;
            }
        }

        return new ProductRepository();
    }
);
