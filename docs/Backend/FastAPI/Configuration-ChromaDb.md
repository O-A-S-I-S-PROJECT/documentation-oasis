# ChromaDB Configuration




# Configuração do chromaDB
O chromaDB é o banco de dados da inteligência artificial e o seu funcionamento se desenvolve por meio dele, portanto para a integração da api com o banco de dados da IA, colocamos a configuração no arquivo application.py antes de começar a aplicação de fato:

~~~
#--- Configuração de inicialização do chromaDB ---

# Uma forma de como rodar puxando as consfigurações do dotenv

load_dotenv()
global source_directory, persist_directory, chroma_settings
~~~

~~~
#--- Essa é a configuração do chromaDB faz com que possa modificar alguns dados e que possa usa-lo ---

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