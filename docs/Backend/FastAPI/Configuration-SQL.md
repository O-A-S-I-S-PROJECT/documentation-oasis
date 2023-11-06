# SQL Configuration




# Configuração do banco de dados SQLServer/ MySQL
Crie um arquivo models.py e dentro dele instancie as tabelas e o que deseja colocar nelas

~~~
#--- Configuração da tabela ---

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
#--- Retorna os dados que possui dentro do banco de dados ---

@app.get("/user", response_model=List[UserSchema])
async def index(db:Session=Depends(get_db)):
    return db.query(User).all()
~~~

~~~
#--- Cria uma tabela ---

@app.get("/userc")
async def criarUsuario(db:Session=Depends(get_db)):
    u = User(email="", name="", password="", is_active = False, id = "")
    db.add(u)
    db.commit()
    return u
~~~
