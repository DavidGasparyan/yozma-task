import {Request, Response} from 'express';
import {QuestionsService} from '../services/questionsService';

const QuestionsCtrl = {
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

    try {
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

    try {
      const deletedQuestion = await QuestionsService.deleteQuestion(Number(id));
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
