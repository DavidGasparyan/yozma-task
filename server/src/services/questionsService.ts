
const DEFAULT_QUESTIONS = [{
  questions: 'What?',
  answer: ''
},{
  questions: 'Who?',
  answer: ''
},{
  questions: 'Where',
  answer: ''
}];

// TODO: use any storage to save the questions
export class QuestionsService {

  static async getQuestions() {
    return Promise.resolve(DEFAULT_QUESTIONS);
  }

}
