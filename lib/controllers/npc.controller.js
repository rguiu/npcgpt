import express from 'express';
import service from '../services/npc.service.mjs'
import logger from '../util/logger.mjs'

const router = express.Router();

const create = async(req, res, next)=> {
    const {npc, player} = req.params;
    logger.info(req.body);
    const response = await service.chat(npc, player, req.body.message);
    logger.info(response);
    res.type('text').send(response);
}

router.post('/:npc/:player', create);

export default router;