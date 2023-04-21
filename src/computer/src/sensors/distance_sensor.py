from serial import Serial


class DistanceSensor:
    """
    Distance sensor
    Must pass an opened serial instance
    """

    """Serial instance"""
    _serial: Serial

    """Char value for sending 'on' signal"""
    _on_char: str

    """Char value for sending 'off' signal"""
    _off_char: str

    """Char value for sending 'data' signal"""
    _data_char: str

    def __init__(
        self, serial: Serial, on_char: str, off_char: str, data_char: str
    ) -> None:
        self._serial = serial
        self._on_char = on_char
        self._off_char = off_char
        self._data_char = data_char
        self._serial.read_until()
        pass

    def write(self, char: str) -> str:
        self._serial.write(char.encode())
        return self._serial.readline().decode().strip()

    def on(self) -> None:
        self._serial.write(self._on_char.encode())
        self._serial.read_until(b'on ')
        pass

    def off(self) -> None:
        self._serial.write(self._off_char.encode())
        self._serial.read_until(b'off ')
        pass

    def read(self) -> int:
        """
        Returns the analog value of the sensor
        If the sensor is off, it will return -1
        """
        response = self.write(self._data_char)

        try:
            value = int(response)
        except ValueError:
            return -1

        return value
