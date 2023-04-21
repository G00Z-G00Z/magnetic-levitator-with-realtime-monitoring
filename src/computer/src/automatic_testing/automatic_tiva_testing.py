"""
The sample table takes in measurements and keeps track of some data
"""

import pandas as pd
import numpy as np
from datetime import datetime
from pandas import DataFrame
from .saving_dir import DATAFRAMES_DIR

from sensors import DistanceSensor
from dotenv import load_dotenv
import os

load_dotenv()


class AutomaticTivaTest:
    _name: str
    _sensor: DistanceSensor

    """How many times will the test repeat"""
    _repeat: int = 1

    _dfs: list[pd.DataFrame]

    _vector_mm: np.ndarray

    def get_df_names(self) -> list[str]:
        return [self._get_df_repeat_name(i) for i in range(self._repeat)]

    def _get_df_repeat_name(self, repeat: int) -> str:
        name = f"{self._name}_{repeat}.csv"
        full_path = os.path.join(DATAFRAMES_DIR, name)
        return full_path

    def __init__(
        self,
        name: str,
        sensor: DistanceSensor,
        mm_range: np.ndarray,
        repeat: int = 1,
    ) -> None:
        # Save the parameters
        self._name = name
        self._repeat = repeat
        self._dfs = []
        self._sensor = sensor
        self._sensor.on()

        self._vector_mm = mm_range

        total_samples = len(self._vector_mm)

        # Initialize the dataframes
        self._dfs = [self._init_df(total_samples) for _ in range(self._repeat)]

    def _init_df(self, total_samples: int) -> DataFrame:
        data = {
            "millimeters": np.full(total_samples, 0),
            "analog_value": np.full(total_samples, 0.0),
            "datetime": np.full(total_samples, datetime.now()),
        }

        df = pd.DataFrame(
            data,
        )

        df = df.astype(
            {
                "millimeters": float,
                "analog_value": int,
            }
        )

        return df

    def run(self) -> None:
        print(50 * "-")
        print("Running test", self._name)
        print("Press enter to take a measurements!")
        for repeat in range(len(self._dfs)):
            print(f"Run number { repeat + 1 }")
            df = self._dfs[repeat]
            for idx, mm_value in enumerate(self._vector_mm):
                input(f"Set distance distance to {mm_value}mm")
                response = self._sensor.read()
                print("Adc Current Value", response)
                df["millimeters"][idx] = mm_value
                df["analog_value"][idx] = response
                df["datetime"][idx] = datetime.now()
                pass

            df_name = self._get_df_repeat_name(repeat)
            # Save the dataframe
            df.to_csv(
                df_name,
                index=False,
            )

        self._sensor.off()
        pass
