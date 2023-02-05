sap.ui.define(
    [
        'sap/ui/core/Fragment',
    ],
    function (
        Fragment,
    ) {
        class Dialog {
            constructor() {
                this._instances = {};
                this._options = {};
            }

            async open(fragment, controller, options = undefined) {
                await this._create(fragment, controller, options);
                const dialogController = this._getController(fragment);
                if (dialogController.onInit) {
                    dialogController.onInit();
                }
                this._getView(fragment).open();
            }

            close(fragment, result) {
                const dialogCallback = this._getCallback(fragment);
                const dialogController = this._getController(fragment);
                const dialogView = this._getView(fragment);
                if (dialogView.close) {
                    dialogView.close();
                }
                if (dialogController.onExit) {
                    dialogController.onExit();
                }
                dialogCallback(result);
                dialogView.destroy();
                dialogView.exit();
                this._instances[fragment] = null;
            }

            async _create(fragment, controller, options) {
                const dialogData = options && options.data ? options.data : {};
                const dialogCallback = options && options.callback ? options.callback : (() => {});
                this._options[fragment] = { data: dialogData, callback: dialogCallback };
                if (!this._exists(fragment)) {
                    const dialogControllerPath = this._getControllerPath(fragment);
                    const dialogViewPath = this._getViewPath(fragment);
                    const { dialogController, dialogView } = await this._load(
                        fragment,
                        controller,
                        dialogControllerPath,
                        dialogViewPath,
                        dialogData
                    );
                    this._instances[fragment] = { view: dialogView, controller: dialogController };
                }
            }

            _load(fragment, controller, dialogControllerPath, dialogViewPath, dialogData) {
                return new Promise(resolve => {
                    sap.ui.require([dialogControllerPath], async function (DialogController) {
                        const dialogController = new DialogController(fragment, dialogData);
                        const mainView = controller.getView();
                        const mainId = mainView.getId();
                        const dialogView = await Fragment.load(({
                            name: dialogViewPath,
                            controller: dialogController,
                            id: mainId,
                        }));
                        dialogController.oView = mainView;
                        mainView.addDependent(dialogView);
                        resolve({ dialogController, dialogView });
                    });
                });
            }

            _exists(fragment) {
                return !!this._instances[fragment];
            }

            _getCallback(fragment) {
                return this._options[fragment]['callback'];
            }

            _getData(fragment) {
                return this._options[fragment]['data'];
            }

            _getView(fragment) {
                if (this._exists(fragment)) {
                    return this._instances[fragment]['view'];
                }
                return undefined;
            }

            _getController(fragment) {
                if (this._exists(fragment)) {
                    return this._instances[fragment]['controller'];
                }
                return undefined;
            }

            _getViewPath(fragment) {
                const appPath = 'de.jlabs.';
                const srcPath = `presentation.dialogs.${fragment}.${fragment}`;
                return `${appPath}.${srcPath}`;
            }

            _getControllerPath(fragment) {
                const appPath = 'de/jlabs/';
                const srcPath = `presentation/dialogs/${fragment}/${fragment}.controller`;
                return `${appPath}/${srcPath}`;
            }
        }
        return new Dialog();
    }
);
