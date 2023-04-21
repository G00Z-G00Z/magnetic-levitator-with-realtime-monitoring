from pandas import DataFrame
import pandas as pd
from automatic_testing import DATAFRAMES_DIR
import os


def get_tiva_testing_dataframes(test_name: str, repeats: int) -> list[DataFrame]:
    """Reads the dataframes from the automatic test"""

    dfs_names = [
        os.path.join(DATAFRAMES_DIR, f"{test_name}_{i}.csv")
        for i in range(repeats)
    ]

    dfs = [
        pd.read_csv(
            name,
            dtype={
                "millimeters": float,
                "analog_value": int,
            },
            parse_dates=["datetime"],
        )
        for name in dfs_names
    ]

    return dfs
