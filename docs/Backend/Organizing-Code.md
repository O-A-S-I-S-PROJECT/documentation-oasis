# Organização do codigo e suas pastas adicionadas
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

We organized the code in a few steps which consists mainly of the versions of the folders and the source_documents folder of the AI.

When opened the code has a folder called version with other versions inside, each version means the state of the code that are the beginning, middle and current of the code.

<Tabs className="unique-tabs">
  <TabItem value="v1">Version 1 is the beginning of separation of files from the AI and gathering of the API. This was done for testing and was left as an example of how we started to test, because the form that was made will be used in the next versions that will be the organization of the code. </TabItem>
  <TabItem value="v1.2">Version 1.2 was separated into three files the application of the api (application.py), the AI service (service.py) and the test that is the attempt to connect with the artificial intelligence database to make the manipulation of the documents of the source directory Documents that belongs to the IA.</TabItem>
  <TabItem value="v1.2.1">Last version 1.2.1 marks the current project code organization in it has 4 main files which is the application, database configuration, api configuration model and artificial intelligence service (respectively application.py, database.py, models.py and services.py).</TabItem>
</Tabs>
