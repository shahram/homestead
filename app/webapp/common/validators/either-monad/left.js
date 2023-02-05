sap.ui.define(
    [],
    function () {
        class Left {
            constructor(value) {
                this.value = value;
            }

            isLeft() {
                return true;
            }

            isRight() {
                return false;
            }
        }

        const left = value => new Left(value);

        return left;
    }
);
