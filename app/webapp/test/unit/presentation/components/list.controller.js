sap.ui.define([
    'de/jlabs//presentation/components/list/list.controller'
], function (Controller) {
    QUnit.module('List Controller');
    QUnit.test('it should test the List controller', function (assert) {
        const listController = new Controller();
        assert.ok(listController);
    });
});
