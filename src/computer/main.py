import serial
import os
import sys
from dotenv import load_dotenv
from sensors import Sensor
from time import sleep

from sensors import TivaDistanceSensor
import numpy as np
from metadata_script import recta_calibracion_piecewise

load_dotenv()
port = os.getenv("SERIAL_PORT")

if port is None:
    sys.stderr.write("SERIAL_PORT was not defined\n")
    sys.exit(1)

baudrate = 9600  # replace with the baud rate used by your Arduino

with serial.Serial(
    port,
    baudrate,
    timeout=1,
    bytesize=serial.EIGHTBITS,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
) as ser:
    # Wait some time to initialize
    sleep(1)

    distance_sensor: Sensor = TivaDistanceSensor(
        ser, on_char="^", off_char="$", data_char="d"
    )

    distance_sensor.on()

    while True:
        # Get the input of the user and send it to the arduino

        response = distance_sensor.read()
        valor_mm_arr = recta_calibracion_piecewise(np.array([response])) 
        print("Adc Current Value", response)
        print("Prediction mm", valor_mm_arr[0], "mm")
        sleep(0.5)

    # Turn off the arduino
    distance_sensor.off()
    print("Exited program")
