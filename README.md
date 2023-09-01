# Azure OpenAI Express App

This is an example app using Express and Azure OpenAI to stream chat completions.

## Installation

```bash
git clone https://github.com/mpodwysocki/openai-express.git

cd openai-express
npm install
```

You will need to create a `.env` file with the credentials such as what is in the `sample.env` file for the Express port as well as the Azure OpenAI Credentials.

```bash
# Express
PORT=7669

# Azure OpenAI
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_DEPLOYMENT=
```

To run the server, use the following:

```bash
npm run dev
```

## Chat Completions

### Using cURL

To interact with the API to do chat completions, you can use cURL or Postman such as the following cURL where you can set the `role` and `content` to be completed.

```bash
curl --location 'http://localhost:7669/api' \
--header 'Content-Type: application/json' \
--data '[{"role":"user","content":"Write me a function that adds two numbers in TypeScript?"}]'
```

### Using the Fetch API

Using the fetch API, you can do the following:

```javascript
const messages = [
  {
    "role": "user",
    "content":"Write me a function that adds two numbers in TypeScript?"
  }
];

const response = await fetch("/api", {
  method: "POST",
  headers: {
  "Content-Type": "application/json"
  },
  body: JSON.stringify(get(messages))
});

const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
while (true) {
  const { done, value } = await reader.read()
  if (done) {
    break
  }

  console.log(value);
}
```

## LICENSE

MIT
