import fs from 'fs';

const dataPath = './data.json'

const saveQuestionData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getQuestionsData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}

export const getAllData = (req, res) => {
    const questionsData = getQuestionsData();
    res.send(questionsData);
}

export const findTopics = (req, res) => {
    const questionsData = getQuestionsData();
    const topics = questionsData['topicos']

    console.log(topics)

    res.send(topics);
}

export const findQuestions = (req, res) => {
    const questionsData = getQuestionsData();
    const topics = questionsData['topicos'];
    const { id } = req.params;
    const topic = topics.find(topic => topic.id == id)

    console.log(topic.questoes)

    res.send(topic.questoes);
}

export const deleteQuestion = (req, res) =>  {
    const questionData = getQuestionsData();
    const topics = questionData['topicos'];
    fs.readFile(dataPath, "utf-8", (err, data) => {
        const { topicId, questionId } = req.params;
        const topic = topics.find(topic => topic.id == topicId)
        const questions = topic.questoes
        const questionIndex = questions.findIndex(question => question.id == questionId)
        questions.splice(questionIndex ,1)

        saveQuestionData(questionData)
        res.send(`Question with id ${questionId} was deleted`)
    }, true);
}

export const updateQuestion = (req, res) => {
    const questionData = getQuestionsData();
    const topics = questionData['topicos'];
    fs.readFile(dataPath, "utf-8", (err, data) => {
        const { id } = req.params;
        const topic = topics.find(topic => topic.id == id)
        const questions = topic.questoes
        let questionId = Math.max(...questions.map(question => question.id)) + 1
        questions.push({ id: questionId, ...req.body})
        saveQuestionData(questionData)
        res.send(`Question with id ${id} updated`)
    }, true);
}