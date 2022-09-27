import express from 'express';

import { getAllData, findTopics, findQuestions, deleteQuestion, updateQuestion } from '../controllers/questions.js';

const router = express.Router();

// all routes here start with /questions
router.get('/', getAllData);

router.get('/topicos', findTopics);

router.get('/topicos/:id/questoes', findQuestions);

router.delete('/topicos/:topicId/questoes/:questionId', deleteQuestion);

router.put('/topicos/:id', updateQuestion)

export default router;