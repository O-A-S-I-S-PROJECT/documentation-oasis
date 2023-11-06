
Para a leitura de documentos construimos um leitor de pdf que atende ao que se espera que o usuário faça e a sua demanda, com isso o trecho de código a seguir trata de se do envio do arquivo para a API para que nela aconteça a leitura e a converção de pdf para txt. 
A conversão de pdf para txt acontece para que a ia consiga ler melhor e mais eficientemente o conteudo do arquivo enviado, assim retornando para você o conteudo.

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

Há outras formas de criar este mesmo leitor de pdf usando bibliotecas ou não, mas para melhor compreensão do codigo construimos de uma forma mais simples, mas que atendesse ao que esperavamos.