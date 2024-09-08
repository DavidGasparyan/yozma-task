import express from 'express';
import QuestionsCtrl from '../controllers/questionsCtrl';

const router = express.Router();

router.get('/questions', QuestionsCtrl.list);
router.get('/questions/:id', QuestionsCtrl.get);
router.post('/questions', QuestionsCtrl.create);
router.put('/questions/:id', QuestionsCtrl.update);
router.delete('/questions/:id', QuestionsCtrl.delete);
router.post('/questions/:id/lock', QuestionsCtrl.lockQuestion);
router.post('/questions/:id/unlock', QuestionsCtrl.unlockQuestion);

export default router;
