from typing import Protocol


class Sensor(Protocol):
    """
    Sensor is a sensor that has these methods
    """

    def on(self) -> None:
        """
        Turns on the sensor
        """
        pass

    def off(self) -> None:
        """
        Turns off the sensor
        """
        pass

    def read(self) -> int:
        """
        Reads a value from a sensor as raw value
        """
        return 0

    def write(self, char: str) -> str:
        """
        Sends a value to sensor and returns a response
        """
        return "Invalid command"
