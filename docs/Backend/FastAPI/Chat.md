The chat that would be at the command prompt was also integrated into the api. This was done to be able to integrate the chat with the front.

In this section, your question is sent to the IA, for questions in general and not necessarily to the document that the user sent.

~~~
#--- Not necessarily to documents ---
#--- General chat ---
@app.get('/gepete', status_code=status.HTTP_202_ACCEPTED)
async def sendQuestion(q:Optional[str]=Query(default="")):
    answer = await questionAnswer(q)
    return answer
~~~

Already this function is directed to the reading of document and document in specifice that the user sent.
In this function there is the search of the document by name, the question asked by the usual and the return of the answer based on the question asked.

~~~
#--- For documents and more specific, it does almost the same thing as the general chat ---
@app.post('/gepete', status_code=status.HTTP_202_ACCEPTED)
async def sendQuestion(question: Question):
    answer, docs = await questionAnswer(query=question.question, file_name=question.file_name)
    question.answer = answer
    question.docs = docs
    return question
~~~
