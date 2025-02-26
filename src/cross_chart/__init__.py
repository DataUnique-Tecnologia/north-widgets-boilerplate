import importlib.metadata
import pathlib
from typing import List, Optional

from .types.configs import ConfigsType
from .utils import get_columns_info, get_datasource, get_default_theme
import pandas as pd
import anywidget
import traitlets
import json

from .types.theme import Theme

try:
    __version__ = importlib.metadata.version("cross_chart")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


class CrossChart(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "static" / "widget.js"
    _css = pathlib.Path(__file__).parent / "static" / "widget.css"

    theme: Theme = traitlets.Dict(get_default_theme()).tag(sync=True)
    columns_info: List = traitlets.List([]).tag(sync=True)
    datasource: List = traitlets.List([]).tag(sync=True)
    configs: ConfigsType | None = traitlets.Any(None).tag(sync=True)
    allow_changes: bool = traitlets.Bool(True).tag(sync=True)

    def __init__(
        self,
        dataframe: pd.DataFrame,
        configs: Optional[ConfigsType | str] = None,
        allow_changes: Optional[bool] = True,
        theme: Optional[Theme] = None,
        *args,
        **kwargs
    ):
        super().__init__(*args, **kwargs)

        self.columns_info = get_columns_info(dataframe)
        self.datasource = get_datasource(dataframe)
        
        self.allow_changes = allow_changes

        if configs:            
            if isinstance(configs, str):
                self.configs = json.loads(configs)
            else:
                self.configs = configs
        else:
            self.configs = {
                'mark': {
                    'type': 'bar',
                    'configs': {
                        'normalized': False,
                        'stacked': False
                    }
                },
            }
                
        if theme:
            self.theme = theme

    def get_configs(self):
        return self.configs