import fs from 'fs';
import logger from '../../util/logger.mjs'


const PATH = process.env.NPC_PATH || '.data'

const getBasePromptForNPC = (name) => {
    try {
        logger.info({ file: `${PATH}/${name}.txt` });
        const data = fs.readFileSync(`${PATH}/${name}.txt`, 'utf8');
        logger.info(data);
        return data;
    } catch (e) {
        logger.error(e);
        throw new Error('Failed to read file');
    }

}

export { getBasePromptForNPC };