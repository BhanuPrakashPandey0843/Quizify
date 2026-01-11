// In-memory question bank for demo only
// TODO: Replace with database (MongoDB/PostgreSQL)
const questionsByExam = {
  "afcat-demo": [
    {
      id: "q1",
      sectionId: "sec-1",
      text: "Which of the following is the capital of India?",
      options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
      correctIndex: 1,
      marks: 3,
    },
    {
      id: "q2",
      sectionId: "sec-1",
      text: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctIndex: 1,
      marks: 3,
    },
    {
      id: "q3",
      sectionId: "sec-2",
      text: "Select the correctly spelled word.",
      options: ["Definately", "Definitely", "Definitley", "Definetely"],
      correctIndex: 1,
      marks: 3,
    },
  ],
};

// answers: sessionId -> { [questionId]: { selectedIndex, answeredAt } }
const answersBySession = new Map();

const getQuestions = (req, res) => {
  const examId = req.params.examId;
  const questions = questionsByExam[examId];
  if (!questions) {
    return res.status(404).json({ error: "No questions for exam" });
  }
  // Shuffle copy
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return res.json(shuffled);
};

const submitAnswer = (req, res) => {
  const { sessionId, questionId, selectedIndex } = req.body;
  if (!sessionId || !questionId || typeof selectedIndex !== "number") {
    return res
      .status(400)
      .json({ error: "sessionId, questionId and selectedIndex required" });
  }

  const key = sessionId;
  const existing = answersBySession.get(key) || {};
  existing[questionId] = {
    selectedIndex,
    answeredAt: Date.now(),
  };
  answersBySession.set(key, existing);

  return res.status(200).json({ status: "saved" });
};

const getSessionAnswers = (req, res) => {
    const { sessionId } = req.params;
    const answers = answersBySession.get(sessionId) || {};
    res.json(answers);
};

module.exports = {
  getQuestions,
  submitAnswer,
  getSessionAnswers
};
