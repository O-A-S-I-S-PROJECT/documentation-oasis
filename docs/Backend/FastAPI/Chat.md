Colocamos o chat que antes seria no prompt de comando na api também. Fizemos isso para conseguir fazer a integração do chat com o front.

Neste trecho acontece o envio da sua pergunta para a IA
~~~
@app.get('/gepete', status_code=status.HTTP_202_ACCEPTED)
async def sendQuestion(q:Optional[str]=Query(default="")):
    answer = await questionAnswer(q)
    return answer
~~~

~~~
@app.post('/gepete', status_code=status.HTTP_202_ACCEPTED)
async def sendQuestion(question: Question):
    answer, docs = await questionAnswer(query=question.question, file_name=question.file_name)
    question.answer = answer
    question.docs = docs
    return question
~~~