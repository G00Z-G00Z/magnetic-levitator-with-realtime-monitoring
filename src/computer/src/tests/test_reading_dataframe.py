from automatic_testing.automatic_tiva_testing import AutomaticTivaTest
import pytest
from parameters_calculations.read_automatic_test_table import (
    get_tiva_testing_dataframes,
)
from sensors.distance_sensor import DistanceSensor


@pytest.fixture
def name_of_test():
    """Test the name of the test"""
    return "histeresis"


@pytest.fixture
def repeats_of_test():
    """Test the name of the test"""
    return 2


def test_reading_test_dataframe(name_of_test: str, repeats_of_test: int):
    """Test reading the dataframe from the automatic test"""

    # Run the test
    # Read the dataframes
    dfs = get_tiva_testing_dataframes(name_of_test, repeats_of_test)

    # Check the dataframes
    assert len(dfs) == repeats_of_test
    assert dfs[0].dtypes["millimeters"] == float
    assert dfs[0].dtypes["analog_value"] == int
    assert dfs[0].dtypes["datetime"] == "datetime64[ns]"

    print(dfs[0].head())
