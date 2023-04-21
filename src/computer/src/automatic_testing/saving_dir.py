"""
This is where you get the DATAFRAMES_DIR environment variable
"""

from dotenv import load_dotenv
import os

load_dotenv()

_SAVE_PATH = os.getenv("DATAFRAMES_DIR", "")

if _SAVE_PATH == "":
    raise ValueError("SAVE_PATH was not defined")

if not os.path.exists(_SAVE_PATH):
    os.makedirs(_SAVE_PATH)

"""Directory where the dataframes will be saved"""
DATAFRAMES_DIR = _SAVE_PATH
