
1. uses basic pitch a neural network from spotify to extract features from a song
2. Converts audio features like pitch and timings into MIDI data 
3. Midi means Musical Instrument Digital Interface
4. Midi data is a standard format for music files
5. Midi data is used to represent music in digital form

6. extract pitch data from MIDI data
7. create normalized histogram of note frequencies
8. represent songs as 128-dimensional vectors for cosine similarity comparison

WorkFlow 
    Data Ingestion

        Processes a CSV (song_data.csv) containing song metadata and audio URLs.

        Separates vocals from tracks using Demucs for cleaner note extraction.

        Converts vocals to embeddings and stores them in Astra DB.

    Similarity Search

        When a user uploads an audio file:

            The system generates its embedding.

            Queries the database for songs with the closest vector matches (cosine similarity).


