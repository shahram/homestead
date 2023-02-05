sap.ui.define(
    [
        'de/jlabs//common/errors/validation',
        'de/jlabs//common/misc/i18n',
        'de/jlabs//common/validators/either-monad/left',
        'de/jlabs//common/validators/either-monad/right',
        'de/jlabs//infra/repositories/product',
    ],
    function (
        ValidationError,
        i18n,
        left,
        right,
        repository,
    ) {
        class FindProductByIdService {
            async handle(id) {
                try {
                    const result = await repository.findById(id);
                    const product = this._serializeProducts(result);
                    return right(product);
                } catch (error) {
                    const stack = error.stack;
                    const product = i18n.translate('failedToRetrieveData');
                    return left(new ValidationError({ product, stack }));
                }
            }

            _serializeProducts(product) {
                return {
                    categoryId: product.CategoryID,
                    discontinued: product.Discontinued,
                    productId: product.ProductID,
                    productName: product.ProductName,
                    quantityPerUnit: product.QuantityPerUnit,
                    reorderLevel: product.ReorderLevel,
                    supplierId: product.SupplierID,
                    unitPrice: product.UnitPrice,
                    unitsInStock: product.UnitsInStock,
                    unitsOnOrder: product.UnitsOnOrder,
                };
            }
        }

        return new FindProductByIdService();
    }
);
