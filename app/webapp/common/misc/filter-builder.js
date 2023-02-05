sap.ui.define(
    [
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator'
    ],
    function (
        FilterSap,
        FilterOperator
    ) {
        class FilterBuilder {
            constructor() {
                this._assembledFilters = [];
            }

            assemble() {
                const filters = this._assembledFilters;
                this.reset();
                return filters;
            }

            reset() {
                this._assembledFilters = [];
                return this;
            }

            equals(paths, value) {
                this._create({ paths, operator: FilterOperator.EQ, value1: value, caseSensitive: false });
                return this;
            }

            not(paths, search) {
                this._create({ paths, operator: FilterOperator.NE, value1: search, caseSensitive: true });
                return this;
            }

            contains(paths, value) {
                this._create({ paths, operator: FilterOperator.Contains, value1: value, caseSensitive: false });
                return this;
            }

            between(paths, value1, value2) {
                this._create({ paths, operator: FilterOperator.BT, value1, value2, caseSensitive: true });
                return this;
            }

            _create(options) {
                const hasManyPaths = Array.isArray(options.paths);
                const hasManyValues = Array.isArray(options.value1);
                if (hasManyValues) {
                    options.value1 = options.value1.filter(value => !!value && value.length > 0);
                }

                if (hasManyValues && hasManyPaths) {
                    if (options.value1 && options.value1.length > 0) {
                        this._createMultiPathsAndValuesFilter(options);
                    }
                } else if (hasManyValues) {
                    if (options.value1 && options.value1.length > 0) {
                        this._createMultiValueFilter(options);
                    }
                } else if (hasManyPaths) {
                    if (options.value1) {
                        this._createMultiPathFilter(options);
                    }
                } else {
                    if (options.value1) {
                        this._createSimpleFilter(options);
                    }
                }
            }

            _createSimpleFilter({ paths, operator, value1, value2, caseSensitive }) {
                this._assembledFilters.push(this._createFilterInstance({
                    path: paths,
                    operator,
                    value1,
                    value2,
                    caseSensitive,
                }));
            }

            _createMultiValueFilter({ paths, operator, value1, value2, caseSensitive }) {
                const filter = value1.map(value => this._createFilterInstance({
                    path: paths,
                    operator,
                    value1: value,
                    value2,
                    caseSensitive,
                }));
                const condition = new FilterSap(filter, false);
                this._assembledFilters.push(condition);
            }

            _createMultiPathFilter({ paths, operator, value1, value2, caseSensitive }) {
                const filter = paths.map(path => this._createFilterInstance({
                    path,
                    operator,
                    value1,
                    value2,
                    caseSensitive,
                }));
                const condition = new FilterSap(filter, false);
                this._assembledFilters.push(condition);
            }

            _createMultiPathsAndValuesFilter({ paths, operator, value1, value2, caseSensitive }) {
                const multiFilter = [];
                for (const path of paths) {
                    const pathFilter = [];
                    for (const value of value1) {
                        const valueFilter = this._createFilterInstance({
                            path,
                            operator,
                            value1: value,
                            value2,
                            caseSensitive,
                        });
                        pathFilter.push(valueFilter);
                    }

                    const pathCondition = new FilterSap(pathFilter, false);
                    multiFilter.push(pathCondition);
                }
                const multiCondition = new FilterSap(multiFilter, false);
                this._assembledFilters.push(multiCondition);
            }

            _createFilterInstance(options) {
                const filterOptions = {
                    path: options.path,
                    operator: options.operator,
                    value1: options.value1,
                    value2: options.value2,
                };

                if (!window.location.origin.includes('localhost')) {
                    filterOptions.caseSensitive = options.caseSensitive;
                }

                return new FilterSap(filterOptions);
            }

            changeLabels(filter, goLabel, clearLabel) {
                filter.addEventDelegate({
                    onAfterRendering: event => {
                        event.srcControl._oSearchButton.setText(goLabel);
                        event.srcControl._oClearButtonOnFB.setText(clearLabel);
                    }
                });
            }
        }

        return new FilterBuilder();
    }
);
