sap.ui.define(
    [
        'sap/ui/model/resource/ResourceModel'
    ],
    function (
        ResourceModel
    ) {
        class I18n {
            constructor() {
                const bundleName = 'de.jlabs..common.i18n.i18n';
                const bundleI18n = new ResourceModel({ bundleName });
                const bundleResources = bundleI18n.getResourceBundle();
                this._bundleResources = bundleResources;
            }

            translate(key, valuesToReplace = undefined) {
                return this._bundleResources.getText(key, valuesToReplace);
            }

            exists(key) {
                return this._bundleResources.hasText(key);
            }
        }

        return new I18n();
    }
);
