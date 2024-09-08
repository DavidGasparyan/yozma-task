import {Question} from "../entity/question.entity";
import {AppDataSource} from "../data-source";

export class QuestionsService {
  static questionRepository = AppDataSource.getRepository(Question);

  static async getQuestions() {
    return await this.questionRepository.find();
  }

  static async getQuestionById(id: number) {
    return await this.questionRepository.findOneBy({ id });
  }

  static async createQuestion(questionData: { question: string; answer: string }) {
    const newQuestion = this.questionRepository.create(questionData);
    return await this.questionRepository.save(newQuestion);
  }

  static async updateQuestion(id: number, questionData: { question: string; answer: string }) {

    await this.questionRepository.update(id, questionData);
    return await this.questionRepository.findOneBy({ id });
  }

  static async deleteQuestion(id: number): Promise<Question> {
    const questionToRemove = await this.questionRepository.findOneBy({ id });
    if (questionToRemove) {
      await this.questionRepository.delete(questionToRemove);
    }
    return questionToRemove;
  }
}
