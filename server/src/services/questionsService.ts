import { getRepository } from 'typeorm';
import {Question} from "../entity/Question.entity";
import {AppDataSource} from "../data-source";

export class QuestionsService {

  static async getQuestions() {
    const questionRepository = AppDataSource.getRepository(Question);
    return await questionRepository.find();
  }

  static async getQuestionById(id: number) {
    const questionRepository = AppDataSource.getRepository(Question);
    return await questionRepository.findOneBy({ id });
  }

  static async createQuestion(questionData: { question: string; answer: string }) {
    const questionRepository = AppDataSource.getRepository(Question);
    const newQuestion = questionRepository.create(questionData);
    return await questionRepository.save(newQuestion);
  }

  static async updateQuestion(id: number, questionData: { question: string; answer: string }) {
    const questionRepository = AppDataSource.getRepository(Question);
    await questionRepository.update(id, questionData);
    return await questionRepository.findOneBy({ id });
  }

  static async deleteQuestion(id: number) {
    const questionRepository = AppDataSource.getRepository(Question);
    const questionToRemove = await questionRepository.findOneBy({ id });
    if (questionToRemove) {
      await questionRepository.remove(questionToRemove);
    }
    return questionToRemove;
  }
}
