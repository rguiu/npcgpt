# MUD-to-ChatGpt Bridge

The MUD-to-ChatGpt Bridge is a GitHub project that allows you to connect a Multi-User Dungeon (MUD) game to the OpenAI ChatGpt API. This integration enhances the conversational skills of the non-player characters (NPCs) in the MUD by leveraging the power of ChatGpt.

To use this bridge, follow the instructions below:

## Prerequisites

Before running the project, ensure you have the following:

1. A ChatGpt API key from OpenAI.
2. A secret key (API_KEY) to secure access to the service.
3. An initial prompt for the NPCs stored in a file (e.g., [rat.txt](./data/rat.txt)).

## Setup

1. Create a file named `.env` in the project directory.
2. Add the following environment variables to the `.env` file:

   ```
   OPENAI_API_KEY=<ChatGpt API key>
   API_KEY=<secret key>
   NPC_PATH=<path to the initial prompt of the NPCs>
   ```

   Note: The `NPC_PATH` variable is optional. If not provided, the default path is `./data` where the initial prompt of the monsters is installed.

3. Store the initial prompt file (e.g., [rat.txt](./data/rat.txt)) in the specified `NPC_PATH` directory.

## Usage

To start the application, run the following command:

```bash
npm run lib/index.mjs
```

## Making API Calls

To interact with the service, use the following format for API calls:

```
/chat/<player>/<npc>
```

Send a JSON payload in the body of the request with the following structure:

```json
{
  "message": "your message here"
}
```

Example call using cURL:

```bash
curl -s http://thepath:3000/chat/johntheplayer/shopkeeper \
  --header 'x-api-key: tmpkey' \
  --header 'Content-Type: application/text' \
  --data '{"message": "where is the gnomes village?"}'
```

Make sure to replace `thepath` with the actual URL or IP address where the service is hosted.

Now you can call the service and receive responses from the NPCs in the MUD using the ChatGpt-powered conversational skills.

Feel free to explore and modify the project to suit your specific requirements. Enjoy the enhanced NPC interactions in your MUD game!