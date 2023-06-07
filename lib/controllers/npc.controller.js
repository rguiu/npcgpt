import express from 'express';
import service from '../services/npc.service.mjs'
import logger from '../util/logger.mjs'

const router = express.Router();

const create = async (req, res, next) => {
    const { npc, player } = req.params;
    logger.info(req.body);
    service.chat(npc, player, req.body.message).then((response) => {
        logger.info(response);
        res.type('text').send(response);
    }).catch((error) => {

        logger.error(error);
        res.type('text').send('An error has occur.');
    });
}

router.post('/:npc/:player', create);

export default router;