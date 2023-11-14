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
