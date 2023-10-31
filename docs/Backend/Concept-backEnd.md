---
sidebar_position: 6
---

# Tutorial FastAPI

Dentro do projeto você colocara os comandos do framework do FastAPI:

pip install fastapi
pip install "uvicorn[standard]"

Para rodar o uvicorn você pode inserir o comando que faz com que inicie o projeto ou você pode formatar para que assim que você click em start ele iniciar:

Comando de inicialização:
uvicorn main:app --reload

Para rodar esse comando você tera que no final da sua aplicação/ arquivo especificar o caminho:

if __name__ == '__main__':
    import uvicorn
    
    uvicorn.run("application:app", host='127.0.0.1', port=5000, reload=True)

