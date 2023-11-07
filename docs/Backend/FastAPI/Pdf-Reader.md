For the reading of documents we build a pdf reader that meets what the user is expected to do and their demand, with this the following code snippet is about sending the file to the API to make it read and converção from pdf to txt. 
The conversion from pdf to txt happens so that the would be able to read better and more efficiently the content of the file sent, thus returning the content to you.

~~~
@app.post("/upload")
async def upload(file_path: UploadFile = File(...)):
    ext = "." + file_path.filename.rsplit(".", 1)[-1]
    filename = file_path.filename.rsplit(".", 1)[0]
    pdf_reader = PdfReader(file_path.file)
    pdf_text = '\n'.join([page.extract_text() for page in pdf_reader.pages])
    with open(source_directory+'/'+filename+'.txt', 'w', encoding='utf-8') as txt_file:
        txt_file.write(pdf_text)
    return {"file_name": file_path.filename}
~~~

There are other ways to create this same pdf reader using libraries or not, but to better understand the code we built a simpler way, but that met what we expected.