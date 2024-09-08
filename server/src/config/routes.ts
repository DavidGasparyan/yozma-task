import express from 'express';
import QuestionsCtrl from '../controllers/questionsCtrl';

const router = express.Router();

router.get('/questions', [], QuestionsCtrl.list);

// TODO: add POST / PUT

export default router;
