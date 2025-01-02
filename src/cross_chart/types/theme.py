from typing import TypedDict

class BrandPallete(TypedDict):
    blue: str
    light_blue: str
    gray: str
    light_gray: str
    black: str

class CodeGroupPallete(TypedDict):
    default: str
    python: str
    sql: str
    sql_on_df: str

class ExporterGroupPallete(TypedDict):
    default: str

class ActionGroupPallete(TypedDict):
    default: str

class LoaderGroupPallete(TypedDict):
    default: str

class FilterGroupPallete(TypedDict):
    default: str

class MarkdownGroupPallete(TypedDict):
    default: str

class ChartGroupPallete(TypedDict):
    default: str

class GroupPallete(TypedDict):
    code: CodeGroupPallete
    exporter: ExporterGroupPallete
    action: ActionGroupPallete
    loader: LoaderGroupPallete
    filter: FilterGroupPallete
    markdown: MarkdownGroupPallete
    chart: ChartGroupPallete

class StatusPallete(TypedDict):
    negative: str
    positive: str
    warn: str

class TextPallete(TypedDict):
    primary: str
    secondary: str
    terciary: str

class StrokePallete(TypedDict):
    on_card: str
    base: str

class DefaultPallete(TypedDict):
    white: str
    black: str

class MenuPallete(TypedDict):
    hover: str

class LinearBackgroundPallete(TypedDict):
    start: str
    end: str

class BackgroundPallete(TypedDict):
    linear: LinearBackgroundPallete
    elevation_1: str
    elevation_2: str

class ButtonPallete(TypedDict):
    background: str

class Pallete(TypedDict):
    brand: BrandPallete
    group: GroupPallete
    status: StatusPallete
    text: TextPallete
    stroke: StrokePallete
    default: DefaultPallete
    menu: DefaultPallete
    background: BackgroundPallete
    button: ButtonPallete

class Theme(TypedDict):
    pallete: Pallete