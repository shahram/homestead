sap.ui.define(
    [],
    function () {
        class Right {
            constructor(value) {
                this.value = value;
            }

            isLeft() {
                return false;
            }

            isRight() {
                return true;
            }
        }

        const right = value => new Right(value);

        return right;
    }
);
