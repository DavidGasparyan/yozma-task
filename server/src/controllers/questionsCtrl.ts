import {Request, Response} from 'express';
import {QuestionsService} from '../services/questionsService';
import {redisClient} from "../redis";
import {Question} from "../entity/question.entity";

const QuestionsCtrl = {
  lockQuestion: async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId: string = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(400).send('UserId is required.');
    }

    try {
      const lockKey = `question:${id}:lock`;
      const currentLock = await redisClient.get(lockKey);

      if (currentLock && currentLock !== userId) {
        return res.status(423).send('This question is currently being edited by another user.');
      }

      await redisClient.set(lockKey, userId, { EX: 5 * 60 });

      res.status(200).send('Question locked for editing.');
    } catch (error) {
      console.error('Error locking question:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  unlockQuestion: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const lockKey = `question:${id}:lock`;
      await redisClient.del(lockKey);
      res.status(200).send('Question unlocked.');
    } catch (error) {
      console.error('Error unlocking question:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  list: async (req: Request, res: Response) => {
    try {
      const questions = await QuestionsService.getQuestions();
      res.status(200).json(questions);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  get: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const question = await QuestionsService.getQuestionById(Number(id));
      if (!question) {
        return res.status(404).send('Question not found');
      }
      res.status(200).json(question);
    } catch (error) {
      console.error(`Failed to fetch question with ID ${id}:`, error);
      res.status(500).send('Internal Server Error');
    }
  },
  create: async (req: Request, res: Response) => {
    const { question, answer } = req.body;

    try {
      const newQuestion = await QuestionsService.createQuestion({ question, answer });
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error('Failed to create question:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const userId: string = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(400).send('UserId is required.');
    }

    try {
      const lockKey = `question:${id}:lock`;
      const currentLock = await redisClient.get(lockKey);

      if (currentLock && currentLock !== userId) {
        return res.status(423).send('This question is currently being edited by another user.');
      }

      const updatedQuestion = await QuestionsService.updateQuestion(Number(id), { question, answer });

      if (!updatedQuestion) {
        return res.status(404).send('Question not found');
      }

      res.status(200).json(updatedQuestion);
    } catch (error) {
      console.error(`Failed to update question with ID ${id}:`, error);
      res.status(500).send('Internal Server Error');
    }
  },
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(400).send('UserId is required.');
    }
    try {
      const lockKey = `question:${id}:lock`;
      const currentLock = await redisClient.get(lockKey);

      if (currentLock && currentLock !== userId) {
        return res.status(423).send('You are not authorized to delete this question.');
      }

      const deletedQuestion: Question = await QuestionsService.deleteQuestion(Number(id));
      if (!deletedQuestion) {
        return res.status(404).send('Question not found');
      }
      res.status(200).json(deletedQuestion);
    } catch (error) {
      console.error(`Failed to delete question with ID ${id}:`, error);
      res.status(500).send('Internal Server Error');
    }
  },
};



export default QuestionsCtrl;
