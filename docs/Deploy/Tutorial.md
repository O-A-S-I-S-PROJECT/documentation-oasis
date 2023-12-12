# Deploy tutorial

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Tutorial to run the API application

**Pré requisitos:**
<Tabs className="unique-tabs">
  <TabItem value="Version">Python 3.12</TabItem>
  <TabItem value="IDE">Visual Studio with c# and c++ development kit for windows</TabItem>
</Tabs>

**Passos:**
- put the following code in the terminal
~~~
“git clone https://github.com/O-A-S-I-S-PROJECT/chat-bot-api/tree/master”
~~~
- download dependencies, recommended to use Poetry to download, but there are some dependencies that will need to install alone because they were not configured within the Poetry.lock file
- downloading from pip there are 2 versions req.txt where you have all dependencies and versions, and Requirements.txt, where it contains only the necessary dependencies, because they pull the others automatically
- regardless of the form downloaded the first time the code is rotated will need to download by sentence_transformers
~~~
pip install sentence_transformers
~~~
- After that you just need to put the IP address in Applications
- The most current version of the file is 1.3
