sap.ui.define(
    [
        'de/jlabs//infra/adapters/json-model',
    ],
    function (
        ModelService,
    ) {
        class UserRepository {
            async getLoggedUser() {
                const path = '/user-api/attributes';
                const options = { multiValuesAsArrays: true };
                return ModelService.get(path, options);
            }

            getDummyUser() {
                return {
                    name: 'P000049',
                    first_name: 'Sample',
                    last_name: 'Sample',
                    email: 'sample@b2rise.consulting',
                    Groups: [],
                };
            }
        }

        return new UserRepository();
    }
);
