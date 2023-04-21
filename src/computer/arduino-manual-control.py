import serial
import os
import sys
from dotenv import load_dotenv
from sensors import DistanceSensor, Sensor
from time import sleep

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

    distance_sensor: Sensor = DistanceSensor(
        ser, on_char="^", off_char="$", data_char="d"
    )

    distance_sensor.on()

    while True:
        # Prompt the user to enter a command
        command = input(
            "Enter a command ('^' to turn on, 'd' to read, \
                    '$' to turn off, 'q' to exit): "
        )

        if command == "q":
            break

        response = distance_sensor.write(command)

        # Print the response
        print("Arduino response:", response)

    # Turn off the arduino
    distance_sensor.off()
    print("Exited program")
