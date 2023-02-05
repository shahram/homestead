sap.ui.define(
    [
        'sap/ui/model/json/JSONModel',
        'sap/ui/core/UIComponent',
        'de/jlabs//data/services/get-logged-user',
    ],
    function (
        JSONModel,
        UIComponent,
        getLoggedUserService,
    ) {
        // eslint-disable-next-line quotes
        return UIComponent.extend("de/jlabs/.Component", {
            metadata: {
                manifest: 'json'
            },

            init: async function () {
                UIComponent.prototype.init.apply(this, arguments);
                const user = await getLoggedUserService.handle();
                this.setDefaultModels(user);
                this.getRouter().initialize();
            },

            setDefaultModels: function (user) {
                const app = new JSONModel({ layout: 'OneColumn' });
                sap.ui.getCore().setModel(this.getModel());
                sap.ui.getCore().setModel(app, 'app');
                sap.ui.getCore().setModel(user, 'user');
            },
        });
    }
);
