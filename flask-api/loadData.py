import multiprocessing
import os
import subprocess

import pandas as pd
import requests
from astrapy import DataAPIClient
from astrapy.constants import VectorMetric
from dotenv import load_dotenv
from getEmbeds import generate_embedding

load_dotenv()

song_data = pd.read_csv('./song_data.csv')

os.environ["ASTRA_DB_APPLICATION_TOKEN"] = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
os.environ["ASTRA_DB_API_ENDPOINT"] = os.getenv("ASTRA_DB_API_ENDPOINT")

client = DataAPIClient(os.environ["ASTRA_DB_APPLICATION_TOKEN"])
database = client.get_database(os.environ["ASTRA_DB_API_ENDPOINT"])
collection = database.get_collection("song_data")
num_cores = multiprocessing.cpu_count()

temp_dir = 'temp'
os.makedirs(temp_dir, exist_ok=True)

collection = database.create_collection(
    "song_data",
    dimension=128,
    metric=VectorMetric.COSINE,
)

for index, row in song_data.iterrows():
    track = row['Track Name']
    artist = row['Artist Name(s)']
    album = row['Album Name']
    release_date = row['Album Release Date']
    album_image = row['Album Image URL']
    track_url = row['Track Preview URL']

    # write mp3 from track url
    response = requests.get(track_url)
    if response.status_code == 200:
        temp_audio_path = os.path.join(temp_dir, f"{index}.mp3")
        with open(temp_audio_path, 'wb') as f:
            f.write(response.content)
    
    # creates folder separated/htdemucs/idx, clean up folder afterwards.
    demucs_command = f"python3 -m demucs.separate --two-stems=vocals -d cpu -j {num_cores} \"{temp_audio_path}\""
    subprocess.run(demucs_command, shell=True)
    vocals_path = os.path.join('separated/htdemucs',str(index),'vocals.wav')

    # convert vocals to embeddings
    emb = generate_embedding(vocals_path)

    # insert song with embedding into database
    try:
            inserted_song = collection.insert_one({
                "track": track,
                "artist": artist,
                "$vector": emb,
                "album": album,
                "date": release_date,
                "album_image": album_image,
                "track_url": track_url
            })
            print(f"* Inserted {(inserted_song)}\n")
   
    except Exception as e:
        print(f"Insert failed: {e}")
    
    os.remove(temp_audio_path) # storing mp3s temporarily


    



