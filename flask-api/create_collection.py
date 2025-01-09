import os

from astrapy import DataAPIClient
from astrapy.constants import VectorMetric
from dotenv import load_dotenv

load_dotenv()


os.environ["ASTRA_DB_APPLICATION_TOKEN"] = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
os.environ["ASTRA_DB_API_ENDPOINT"] = os.getenv("ASTRA_DB_API_ENDPOINT")

client = DataAPIClient(os.environ["ASTRA_DB_APPLICATION_TOKEN"])
database = client.get_database(os.environ["ASTRA_DB_API_ENDPOINT"])
collection = database.create_collection(
    "song_data",
    dimension=128,
    metric=VectorMetric.COSINE,
)
