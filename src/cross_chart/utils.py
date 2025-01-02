from .types.theme import Theme
import pandas as pd

def get_datasource(dataframe: pd.DataFrame):
    datasource_js = dataframe.to_dict(orient="records")
    
    return datasource_js

def get_columns_info(dataframe: pd.DataFrame):
    columns_info = [
        {
            'column': col,
            'type': str(dataframe[col].dtype)
        } for col in dataframe.columns
    ]
    return columns_info

def get_default_theme() -> Theme:
    return {
        'pallete': {
            'brand': {
                'blue': '#0053FF',
                'light_blue': '#84A8FF',
                'gray': '#686976',
                'light_gray': '#D4D7E1',
                'black': '#282828'
            },
            'group': {
                'code': {
                    'default': '#F5CA35',
                    'python': '#F5CA35',
                    'sql': '#8260E8',
                    'sql_on_df': '#cddc39'
                },
                'action': { 'default': '#8A2BE2' },
                'chart': { 'default': '#0F49C2' },
                'exporter': { 'default': '#C24C7D' },
                'filter': { 'default': '#16A6AD' },
                'loader': { 'default': '#3DB3A1' },
                'markdown': { 'default': '#282828' }
            },
            'status': {
                'negative': '#F83263',
                'positive': '#21CC99',
                'warn': '#ED6C02'
            },
            'text': {
                'primary': '#000000',
                'secondary': '#696972',
                'terciary': '#97A0A9'
            },
            'stroke': {
                'on_card': '#B1B6C7',
                'base': '#DBDBDB'
            },
            'default': {
                'white': '#FBFBFB',
                'black': '#282828'
            },
            'menu': {
                'hover': '#EFEFF4',
            },
            'background': {
                'linear': {
                    'start': '#FFFFFF',
                    'end': '#F1F1F1'
                },
                'elevation_1': '#F2F1F8',
                'elevation_2': '#EAEAEB'
            },
            'button': {
                'background': '#F2F1F8'
            }
        }
    }