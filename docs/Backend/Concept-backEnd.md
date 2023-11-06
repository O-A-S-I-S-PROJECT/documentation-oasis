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

<br/>

# Conecção com o banco de dados SQLServer/ MySQL
Crie um arquivo models.py e dentro dele instancie as tabelas e o que deseja colocar nelas
~~~
class User (Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing':True}
    id=Column(Integer, primary_key=True, index=True)
    name=Column(String(100), primary_key=True, index=True)
    email=Column(String(140), unique=True, index=True)
    password=Column(String(10), unique=True, index=True)
    is_active=Column(Boolean, default=True)

class UserSchema(BaseModel):
    id:int
    name:str
    email:str
    password:str
    is_active:bool

    class Config:
      orm_mode=True


def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)
~~~

<br />

~~~
@app.get("/user", response_model=List[UserSchema])
async def index(db:Session=Depends(get_db)):
    return db.query(User).all()
~~~

~~~
@app.get("/userc")
async def criarUsuario(db:Session=Depends(get_db)):
    u = User(email="", name="", password="", is_active = False, id = "")
    db.add(u)
    db.commit()
    return u
~~~




