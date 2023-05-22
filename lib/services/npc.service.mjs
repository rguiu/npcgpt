import logger from '../util/logger.mjs'
import chatGptService from './chatgpt.service.mjs';
const service = {
    chat: async(from, to, message) => {
        logger.info({
            from, to, message
        })
        return chatGptService.chat(from, to, message);
    }
};

export default service;