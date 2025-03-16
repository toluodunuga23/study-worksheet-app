const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const worksheetOutline = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: ' `Generate a 5th-grade math worksheet focused on fractions and decimals.  \nThe worksheet should include a variety of multiple-choice problems that test students\' understanding of converting fractions to decimals, adding and subtracting fractions, and solving real-world math problems.  \n\nEnsure that the worksheet is engaging by incorporating scenarios that relate to everyday life.  \nEach question should have four answer choices, with only one correct answer.  \n\nAt the end of the worksheet, provide a complete answer key.  \nFormat the output as JSON with the following structure:\n\n{\n  "title": "5th Grade Math - Fractions & Decimals",\n  "subject": "Math",\n  "grade": 5,\n  "topic": "Fractions and Decimals",\n  "questions": [\n    {\n      "question": "Convert 3/4 into a decimal.",\n      "type": "multiple-choice",\n      "options": ["0.5", "0.6", "0.75", "0.8"],\n      "correct_answer": "0.75",\n      "difficulty": "easy"\n    },\n    {\n      "question": "What is 1/2 + 3/8?",\n      "type": "multiple-choice",\n      "options": ["5/8", "7/8", "1/2", "1"],\n      "correct_answer": "7/8",\n      "difficulty": "medium"\n    },\n    {\n      "question": "Lily has 2/3 of a cake and eats 1/4 of it. How much of the cake is left?",\n      "type": "multiple-choice",\n      "options": ["1/3", "5/12", "7/12", "1/2"],\n      "correct_answer": "5/12",\n      "difficulty": "hard"\n    }\n  ],\n  "answer_key": {\n    "1": "0.75",\n    "2": "7/8",\n    "3": "5/12"\n  }\n}`;\n\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "title": "5th Grade Math - Fractions & Decimals",\n  "subject": "Math",\n  "grade": 5,\n  "topic": "Fractions and Decimals",\n  "questions": [\n    {\n      "question": "Convert 1/5 into a decimal.",\n      "type": "multiple-choice",\n      "options": ["0.1", "0.2", "0.25", "0.5"],\n      "correct_answer": "0.2",\n      "difficulty": "easy"\n    },\n    {\n      "question": "What is 2/5 + 1/5?",\n      "type": "multiple-choice",\n      "options": ["1/5", "2/5", "3/5", "4/5"],\n      "correct_answer": "3/5",\n      "difficulty": "easy"\n    },\n    {\n      "question": "Convert 1/2 to a decimal.",\n      "type": "multiple-choice",\n      "options": ["0.1", "0.25", "0.5", "0.75"],\n      "correct_answer": "0.5",\n      "difficulty": "easy"\n    },\n    {\n      "question": "What is 1/4 + 1/4?",\n      "type": "multiple-choice",\n      "options": ["1/8", "1/4", "1/2", "3/4"],\n      "correct_answer": "1/2",\n      "difficulty": "easy"\n    },\n    {\n      "question": "Sarah ate 1/3 of a pizza, and Tom ate 1/6 of the same pizza. How much of the pizza did they eat in total?",\n      "type": "multiple-choice",\n      "options": ["1/9", "1/2", "2/9", "5/6"],\n      "correct_answer": "1/2",\n      "difficulty": "medium"\n    },\n    {\n      "question": "Convert 3/8 to a decimal.",\n      "type": "multiple-choice",\n      "options": ["0.25", "0.3", "0.375", "0.5"],\n      "correct_answer": "0.375",\n      "difficulty": "medium"\n    },\n    {\n      "question": "What is 2/3 - 1/6?",\n      "type": "multiple-choice",\n      "options": ["1/6", "1/3", "1/2", "2/3"],\n      "correct_answer": "1/2",\n      "difficulty": "medium"\n    },\n    {\n      "question": "John has 1/2 of a chocolate bar. He gives 1/4 of the whole bar to his friend. How much of the chocolate bar does John have left?",\n      "type": "multiple-choice",\n      "options": ["1/8", "1/4", "3/8", "1/2"],\n      "correct_answer": "1/4",\n      "difficulty": "medium"\n    },\n    {\n      "question": "A recipe calls for 2/5 cup of flour. You only want to make half the recipe. How much flour do you need?",\n      "type": "multiple-choice",\n      "options": ["1/10 cup", "1/5 cup", "2/10 cup", "2/3 cup"],\n      "correct_answer": "1/5 cup",\n      "difficulty": "medium"\n    },\n    {\n      "question": "Lisa spent 0.25 of her money on a book and 0.3 of her money on a snack. What fraction of her money did she spend in total?",\n      "type": "multiple-choice",\n      "options": ["1/20", "11/20", "1/4", "1/5"],\n      "correct_answer": "11/20",\n      "difficulty": "hard"\n    }\n  ],\n  "answer_key": {\n    "1": "0.2",\n    "2": "3/5",\n    "3": "0.5",\n    "4": "1/2",\n    "5": "1/2",\n    "6": "0.375",\n    "7": "1/2",\n    "8": "1/4",\n    "9": "1/5 cup",\n    "10": "11/20"\n  }\n}\n```',
        },
      ],
    },
  ],
});
