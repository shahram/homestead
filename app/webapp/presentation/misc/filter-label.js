sap.ui.define(
    [
        'de/jlabs//common/misc/i18n',
    ],
    function (
        i18n,
    ) {
        changeFilterLabels = (filterBarReference, goLabel, clearLabel) => {
            if (!goLabel) {
                goLabel = i18n.translate('filter');
            }

            if (!clearLabel) {
                clearLabel = i18n.translate('clear');
            }

            filterBarReference.addEventDelegate({
                onAfterRendering: (event) => {
                    event.srcControl._oSearchButton.setText(goLabel);
                    event.srcControl._oClearButtonOnFB.setText(clearLabel);
                }
            });
        };

        return changeFilterLabels;
    }
);
