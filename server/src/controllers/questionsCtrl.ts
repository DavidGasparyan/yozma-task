import {Request, Response} from 'express';
import {QuestionsService} from '../services/questionsService';

const QuestionsCtrl = {

  list: (req: Request, res: Response) => {

    QuestionsService.getQuestions()
      .then(questions => {
        res.status(200).send(questions);
      }).catch(e => {
        console.error('failed to fetch questions', e);
        res.status(500).send();
    });

  },

};



export default QuestionsCtrl;
