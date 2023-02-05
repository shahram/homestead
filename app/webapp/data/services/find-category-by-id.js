sap.ui.define(
    [
        'de/jlabs//common/errors/validation',
        'de/jlabs//common/misc/i18n',
        'de/jlabs//common/validators/either-monad/left',
        'de/jlabs//common/validators/either-monad/right',
        'de/jlabs//infra/repositories/category',
    ],
    function (
        ValidationError,
        i18n,
        left,
        right,
        repository,
    ) {
        class FindCategoryByIdService {
            async handle(id) {
                try {
                    const result = await repository.findById(id);
                    const category = this._serializeCategory(result);
                    return right(category);
                } catch (error) {
                    const stack = error.stack;
                    const category = i18n.translate('failedToRetrieveData');
                    return left(new ValidationError({ category, stack }));
                }
            }

            _serializeCategory(category) {
                return {
                    categoryId: category.CategoryID,
                    categoryName: category.CategoryName,
                    description: category.Description,
                    picture: category.Picture,
                };
            }
        }

        return new FindCategoryByIdService();
    }
);
