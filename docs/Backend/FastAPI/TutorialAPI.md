---
sidebar_position: 6
---

# Tutorial FastAPI

Inside the project you put the commands of the FastAPI framework:

~~~
pip install fastapi
~~~

~~~
pip install "uvicorn[standard]"
~~~

To run uvicorn you can enter the command that makes the project start or you can format so that as soon as you click start it start:

Command to boot up:

~~~~
uvicorn main:app --reload
~~~~

To run this command you will have to at the end of your application/ file specify the path:

~~~~
if __name__ == '__main__':
    import uvicorn
    
    uvicorn.run("main:app", host='127.0.0.1', port=5000, reload=True)
~~~~
<br/>

Having understood this, let’s put an example of FastAPI code to test:

~~~~
from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

~~~~
*Attention: If you are an apprentice who has a lesson with the python instructor will already know all these steps in different ways than this project, so nothing prevents you from doing the way you **know** with modifications and adaptations.


Para mais tutoriais ou entendimento do FastAPI acesse o site:

**(https://fastapi.tiangolo.com/)**
