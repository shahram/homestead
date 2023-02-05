sap.ui.define(
    [
        'de/jlabs//common/errors/validation',
        'de/jlabs//common/misc/i18n',
        'de/jlabs//common/validators/either-monad/left',
        'de/jlabs//common/validators/either-monad/right',
        'de/jlabs//infra/repositories/supplier',
    ],
    function (
        ValidationError,
        i18n,
        left,
        right,
        repository,
    ) {
        class FindSupplierByIdService {
            async handle(id) {
                try {
                    const result = await repository.findById(id);
                    const supplier = this._serializeSupplier(result);
                    return right(supplier);
                } catch (error) {
                    const stack = error.stack;
                    const supplier = i18n.translate('failedToRetrieveData');
                    return left(new ValidationError({ supplier, stack }));
                }
            }

            _serializeSupplier(supplier) {
                return {
                    supplierId: supplier.SupplierID,
                    companyName: supplier.CompanyName,
                    contactName: supplier.ContactName,
                    contactTitle: supplier.ContactTitle,
                    address: supplier.Address,
                    city: supplier.City,
                    region: supplier.Region,
                    postalCode: supplier.PostalCode,
                    country: supplier.Country,
                    phone: supplier.Phone,
                    fax: supplier.Fax,
                    homePage: supplier.HomePage,
                };
            }
        }

        return new FindSupplierByIdService();
    }
);
