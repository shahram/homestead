sap.ui.define(
    [
        'de/jlabs//common/errors/validation',
        'de/jlabs//common/misc/i18n',
        'de/jlabs//common/validators/either-monad/left',
        'de/jlabs//common/validators/either-monad/right',
        'de/jlabs//infra/repositories/user',
        'de/jlabs//main/config/environment',
    ],
    function (
        ValidationError,
        i18n,
        left,
        right,
        repository,
        Environment,
    ) {
        class GetLoggedUserService {
            async handle() {
                try {
                    const isDevMode = Environment.isDevMode();
                    if (isDevMode) {
                        return right(this._getDummyUser());
                    }
                    return right(this._getLoggedUser());
                } catch (error) {
                    const stack = error.stack;
                    const user = i18n.translate('failedToRetrieveLoggedUser');
                    return left(new ValidationError({ user, stack }));
                }
            }

            _getDummyUser() {
                const user = repository.getDummyUser();
                return this._serializeUserData(user);
            }

            async _getLoggedUser() {
                const user = repository.getLoggedUser();
                return this._serializeUserData(user);
            }

            _serializeUserData(user) {
                return {
                    name: user.name,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email || user.mail,
                    groups: user.Groups,
                };
            }
        }

        return new GetLoggedUserService();
    }
);
