In the service file was made changes in the default settings of privateGPT and also was mainly taken what would be a good part of the base and placed in the service, with that was added some modifications:


Lists the items that are within the Chroma vector.
~~~
def list_db_itens(db):
    print("starting")
    # db.get() gets all infos stored in db, like ids, source metadatas and embbendings
    collection = db.get()
    # in the case it will only get the metadata to search all files names
    ignored = [metadata['source'] for metadata in collection['metadatas']]
    last_name = ""
    itens_names = []
    collection_disposition = []
    for j,i in enumerate(ignored):
        if last_name != i:
            last_name = i
            collection_disposition.append({"id":j,"name":last_name})
            if not itens_names.__contains__(i[i.rfind("\\")+1:]):
                itens_names.append(i[i.rfind("\\")+1:])

        
    info = {"total_collections": db._collection.count(), "total_itens": len(itens_names),"itens_names": itens_names, "collection_disposition": collection_disposition}
    print("finish")

    return info
~~~



Lists the source_directory folder documents.
~~~
def list_dir(source_directory: str):
    return os.listdir(source_directory)
~~~


Returns a json of the files that are within source_directory to read the file names.
~~~
def get_json(source_directory: str) -> List[{str, str}]:
    with open(source_directory+ "\\docs_info.json", "r", encoding="utf-8") as f:
        try:
            data_json = json.load(f)
            return data_json
        except:
            return []
~~~


Rewrite in jsons the items read in the file.
~~~
def change_json(source_directory: str, text):
    with open(source_directory+ "\\docs_info.json", "w", encoding="utf-8") as f:
        # print(j)
        f.write(json.dumps(text, indent=2))
~~~


Adds the items in json that have been rewritten.
~~~
def add_to_json(source_directory: str, itens_to_add: List):
    new_json = add_itens_json(source_directory, itens_to_add)
    change_json(source_directory, new_json)
    return new_json
~~~


Makes the change to be deleted.
~~~
def delete_from_json(source_directory: str, itens_to_remove: List):
    new_json = delete_itens_json(source_directory, itens_to_remove)
    print(new_json)
    change_json(source_directory, new_json)
    return new_json
~~~


Return a list that will serve to be manipulated.
~~~
def delete_itens_json(source_directory: str, itens_to_remove: List):
    data_json = get_json(source_directory)
    new_json = []
    for i in data_json:
        if i['doc_name'] not in itens_to_remove:
            new_json.append(i)
    # change_json(source_directory, data_json)
    return new_json      
~~~


Return from a list, items that will be added are passed and the delete is assuming a function of not adding existing items.
~~~
def add_itens_json(source_directory: str, itens_to_add: List):
    new_json = delete_itens_json(source_directory, itens_to_add)
    for item in itens_to_add:
        new_json.append({"doc_name": item, "last_update":datetime.now().strftime("%d/%m/%Y")})
    return new_json
~~~


Mostra o status dos intens que precisam ser adicionados ou deletados dentro do source_directory e do chroma_store que estão listados dentro do banco de dados, já que o source_directory serve como um banco de dados do banco de dados.
~~~
def see_status_db(persist_directory: str ,CHROMA_SETTINGS: str, source_directory: str):
    
    db = load_db(persist_directory=persist_directory, CHROMA_SETTINGS=CHROMA_SETTINGS)
    
    infos = list_db_itens(db)
    itens_names_db = infos["itens_names"]
    itens_names_root = list_dir(source_directory=source_directory)
    itens_to_delete = [item for item in itens_names_db if item not in itens_names_root]
    itens_to_add = [item for item in itens_names_root if item not in itens_names_db]
    itens_to_add.remove("docs_info.json")
    itens_to_mutate = {
        "itens_to_delete":itens_to_delete,
        "itens_to_add":itens_to_add,
        "collections_info":infos
        }
    db = None
    return itens_to_mutate
~~~


Deleta os arquivos da raiz do banco de dados da pasta do source_directory
~~~
def delete_from_root(source_directory: str, documents_names: List[str]):
    not_exist = []
    for document_name in documents_names:
        exists = os.path.isfile(source_directory + "\\" + document_name) and document_name != "docs_info.json"
        if exists:
            print(source_directory)
            if source_directory[:source_directory.find("/")] == RECYCLE_BIN:
                os.remove(source_directory + "\\" + document_name)
            else:
                if not os.path.isdir(RECYCLE_BIN):
                    os.mkdir(RECYCLE_BIN)
                if not os.path.isdir(RECYCLE_BIN + source_directory[source_directory.find("/"):]):
                    os.mkdir(RECYCLE_BIN + source_directory[source_directory.find("/"):])
                shutil.move(source_directory + "\\" + document_name, RECYCLE_BIN + source_directory[source_directory.find("/"):] + "\\" + document_name)
        else:
            not_exist.append(document_name)
    return not_exist
~~~


Deleta os dados dos documentos dentro do chromaDb
~~~
def delete_from_db(persist_directory: str ,CHROMA_SETTINGS: str, documents_names: List[str]):
    

    db = load_db(persist_directory=persist_directory, CHROMA_SETTINGS=CHROMA_SETTINGS)

    print(db._collection.count())
    print("starting")
    # print(db.get())   
    for x in db.get():
        print("X:" + x)
        if x == 'embeddings':
            continue
        print(db.get()[x].__len__())
    print(type(db.get()['metadatas']))
    last_name = ""
    ids_list = []
    ids_to_delete = []
    deleted_names = []
    for document_name in documents_names:
        name_to_delete = "source_documents/default\\" + document_name
        for i in range(db.get()['metadatas'].__len__()):
            if last_name != db.get()['metadatas'][i]['source']:
                last_name = db.get()['metadatas'][i]['source']
                print(i)
                print(last_name)
            if last_name == name_to_delete:
                ids_list.append(i)
                if not deleted_names.__contains__(last_name):
                    deleted_names.append(last_name)
    for i in ids_list:
        ids_to_delete.append(db.get()['ids'][i])
    print(ids_to_delete)
    if(len(ids_to_delete) == 0):
        return ["no items to delete"]
    db.delete(ids=ids_to_delete)
    db.persist()
    
    db = None
    return deleted_names
~~~
