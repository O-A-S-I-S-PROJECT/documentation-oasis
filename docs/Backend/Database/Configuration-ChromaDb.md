# ChromaDB Configuration


# ChromaDB Configuration
chromaDB is the artificial intelligence database and its operation is developed through it, so for the integration of the api with the AI database, we put the configuration in the application.py file before starting the actual application:

~~~
#--- Setting up the chromaDB startup ---
# A way to rotate by pulling the consfigurations of dotenv

load_dotenv()
global source_directory, persist_directory, chroma_settings
~~~

~~~
#--- This is the configuration of chromaDB makes it possible to modify some data and to use it ---

def change_group(group_name):
    global source_directory, persist_directory, chroma_settings
    source_directory = os.environ.get('SOURCE_DIRECTORY', 'source_documents') + "/" + group_name
    persist_directory = os.environ.get('PERSIST_DIRECTORY') + "/" + group_name
    chroma_settings = Settings(
        chroma_db_impl='duckdb+parquet',
        persist_directory=persist_directory,
        anonymized_telemetry=False
    )
change_group('default')
~~~