import { VegaChartType } from "./ChartTypes";

export type AggregateType =
| "count"
| "valid"
| "values"
| "missing"
| "distinct"
| "sum"
| "product"
| "mean"
| "average"
| "variance"
| "variancep"
| "stdev"
| "stdevp"
| "stderr"
| "median"
| "q1"
| "q3"
| "ci0"
| "ci1"
| "min"
| "max";

export type ConfigsType = {
    mark: {
        type: VegaChartType,
        configs: {
            stacked?: boolean
            normalized?: boolean
        }
    }
    x_axys?: {
        column?: string;
        order_by?: 'ascending' | 'descending';
        group_by?: string | 'None';
        title?: String
    };
    y_axys?: {
        column?: string;
        aggregate?: string | 'None';
        group_by?: string | 'None';
        title?: string
    };
    histogram?: {
        column?: string
        format: 'count' | 'percentage'
        bin_by: 'step_size' | 'auto' | 'max_bins'
    }
    arc?: {
        theta?: string,
        group_by?: string
    }
}