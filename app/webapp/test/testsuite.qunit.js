// eslint-disable-next-line sap-no-global-define
window.suite = function () {
    "use strict";
    /* eslint-disable new-cap */
    const testSuite = new parent.jsUnitTestSuite();
    const contextPath = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);
    testSuite.addTestPage(`${contextPath}unit/unitTests.qunit.html`);
    return testSuite;
};
