sap.ui.define(
    [
        'sap/ui/model/Sorter',
    ],
    function (
        SorterSap,
    ) {
        class Sorter {
            sort(items, key, sortDescending) {
                const sorters = [new SorterSap(key, sortDescending)];
                items.sort(sorters);
            }
        }

        return new Sorter();
    }
);
