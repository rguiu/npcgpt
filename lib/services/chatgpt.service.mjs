import logger from '../util/logger.mjs'
import { Configuration, OpenAIApi } from "openai";
import { shopkeeper } from './npcs/index.mjs';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const MESSAGES_LIMIT = 10;

const VALID_NPCS = {
    shopkeeper
}

const createConversationEntry = (message, from, isPlayer=false) => {
    return {
        role: isPlayer ? 'user':'assistant',
        content: `${isPlayer ? `${from}: `:''}${message}`
    }
}

const messageCaches = {
    shopkeeper: []
};

const prepareConversation = (to, newEntry) => {
    messageCaches[to].push(newEntry);
    if (messageCaches[to].length > MESSAGES_LIMIT) {
        messageCaches[to].shift();
    }
    return [ ...shopkeeper.messages, ...messageCaches[to] ];
}

const sendMessage = async (conversation) => {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversation
    });
    return response.data.choices[0].message.content;
}

const service = {
    chat: async (from, to, message) => {
        logger.info({
            from, to, message
        });
        if (!VALID_NPCS[to]) {
            throw new Error(`Target NPC not found: ${to}`)
        }
        if (!message || message.length === 0) {
            return "I don't know what do you want";
        }
        // logger.info(VALID_NPCS[from].messages);
        const newMessage = createConversationEntry(message, from, true);

        const conversation = prepareConversation(to, newMessage);

        // logger.info({ conversation }, process.env['OPENAI_API_KEY']);

        const response = await sendMessage(conversation);

        prepareConversation(to, createConversationEntry(response));
        logger.info(response);
        return response;
    }
};

export default service;