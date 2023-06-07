import logger from '../util/logger.mjs'
import { Configuration, OpenAIApi } from "openai";
import { getBasePromptForNPC } from './npcs/index.mjs';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const MESSAGES_LIMIT = 5;
const MODEL = 'gpt-3.5-turbo';

const messageCaches = {};

const wrapMessage = (content, role = 'system') => ({
    role,
    content,
});

const createConversationEntry = (message, from, isPlayer=false) => {
    const role = isPlayer ? 'user':'assistant';
    const content = `${isPlayer ? `${from}: `:''}${message}`;
    return wrapMessage(content, role);
};

const prepareConversation = (to, newEntry) => {
    const initialPromt = getBasePromptForNPC(to);
    logger.info({ initialPromt });
    if (!messageCaches[to]) { messageCaches[to] = []; };
    messageCaches[to].push(newEntry);
    if (messageCaches[to].length > MESSAGES_LIMIT) {
        messageCaches[to].shift();
    }
    return [ wrapMessage(initialPromt), ...messageCaches[to] ];
}

const sendMessage = async (conversation) => {
    logger.info({
        model: MODEL,
        messages: conversation
    })
    const response = await openai.createChatCompletion({
        model: MODEL,
        messages: conversation
    });
    return response.data.choices[0].message.content;
}

const service = {
    chat: async (from, to, message) => {
        logger.info({
            from, to, message
        });
        if (!message || message.length === 0) { // May be we should just ignore this.
            return `${to} says: What?`;
        }
        
        const newMessage = createConversationEntry(message, from, true);

        const conversation = prepareConversation(to, newMessage);

        const response = await sendMessage(conversation);

        prepareConversation(to, createConversationEntry(response));
        logger.info({ response });
        return response;
    }
};

export default service;