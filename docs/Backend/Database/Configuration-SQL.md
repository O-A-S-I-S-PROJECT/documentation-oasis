# SQL Configuration


# Configuration of SQLServer/ MySQL database
Create a models.py file and inside it instantiate the tables and what you want to put in them

~~~
#--- Table configuration ---

from typing import List, Optional
from pydantic import BaseModel, validator
from modelsdb import Optional
import os
from typing import Optional, List
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Boolean, VARCHAR
from database import Base, SessionLocal



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

~~~

<br />

~~~
#--- Returns the data you have inside the database ---
import datetime
import shutil
from fastapi import FastAPI, File, HTTPException, UploadFile, status, Response, Path, Query, Header, Depends
from modelsdb import Optional, Question, PathFiles, DocumentList, User, UserSchema, get_db
import concurrent.futures
import json
import time
import os
from typing import Optional, List
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, Boolean, VARCHAR
from database import Base, engine, SessionLocal
import database


Base.metadata.create_all(bind=engine)

@app.get("/user", response_model=List[UserSchema])
async def index(db:Session=Depends(get_db)):
    return db.query(User).all()
~~~

~~~
#--- create a table ---

@app.get("/userc")
async def criarUsuario(db:Session=Depends(get_db)):
    u = User(email="", name="", password="", is_active = False, id = "")
    db.add(u)
    db.commit()
    return u
~~~
