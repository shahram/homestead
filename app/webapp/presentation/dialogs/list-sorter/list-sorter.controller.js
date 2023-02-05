
sap.ui.define(
    [
        'de/jlabs//presentation/dialogs/common/base-dialog',
    ],
    function (
        BaseDialog,
    ) {
        class ListSorterController extends BaseDialog {
            constructor(path, data) {
                super(path, data);
            }

            sort(event) {
                const params = event.getParameters();
                const result = this.getSortParams(params);
                this.close(result);
            }

            getSortParams(params) {
                return {
                    key: params.sortItem.getKey(),
                    decreasing: params.sortDescending,
                };
            }
        }

        return ListSorterController;
    }
);
