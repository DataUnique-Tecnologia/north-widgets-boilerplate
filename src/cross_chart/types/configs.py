from typing import Literal, TypedDict, Optional

class MarkConfig(TypedDict, total=False):
    stacked: bool
    normalized: bool

class Mark(TypedDict):
    type: str  # VegaChartType equivalente
    configs: MarkConfig

class XAxis(TypedDict, total=False):
    column: str
    order_by: Literal['ascending', 'descending']
    group_by: Optional[str]
    title: str

class YAxis(TypedDict, total=False):
    column: str
    aggregate: Optional[str]
    group_by: Optional[str]
    title: str

class Histogram(TypedDict):
    column: str
    format: Literal['count', 'percentage']
    bin_by: Literal['step_size', 'auto', 'max_bins']

class Arc(TypedDict, total=False):
    theta: str
    group_by: str

class ConfigsType(TypedDict, total=False):
    mark: Mark
    x_axys: XAxis
    y_axys: YAxis
    histogram: Histogram
    arc: Arc

AggregateType = Literal[
    "count", "valid", "values", "missing", "distinct", "sum", "product", 
    "mean", "average", "variance", "variancep", "stdev", "stdevp", "stderr", 
    "median", "q1", "q3", "ci0", "ci1", "min", "max"
]
