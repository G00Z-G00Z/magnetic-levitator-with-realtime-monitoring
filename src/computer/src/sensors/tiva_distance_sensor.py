from sensors.distance_sensor import DistanceSensor


class TivaDistanceSensor(DistanceSensor):
    def read(self) -> int:
        """
        Returns the analog value of the sensor
        It recives 2 bytes
        A high byte and low byte
        The total is 12 bits
        """
        self._serial.write(self._data_char.encode())

        # Read two bytes, the high byte and the low byte, and convert them to an integer
        high_byte = self._serial.read()
        low_byte = self._serial.read()
        value =  int.from_bytes(high_byte + low_byte, byteorder="big")

        return value
