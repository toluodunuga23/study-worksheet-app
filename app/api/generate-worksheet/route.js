import { db } from "../../../configs/db";
import { NextResponse } from "next/server";
import { STUDY_MATERIAL_TABLE } from "../../../configs/schema";
import { worksheetOutline } from "../../../configs/AiModel";

export async function POST(req) {
  const { gradeLevel, topic, worksheetId, createdBy, subject } =
    await req.json();

  // Define Prompt
  const PROMPT = `Generate a ${subject} worksheet for a student in ${gradeLevel}. This student wants to focus on ${topic}.
The worksheet should include a variety of multiple-choice problems that test students' understanding of converting fractions to decimals, adding and subtracting fractions, and solving real-world math problems.

Ensure that the worksheet is engaging by incorporating scenarios that relate to everyday life.
Each question should have four answer choices, with only one correct answer.

At the end of the worksheet, provide a complete answer key.
Format the output as JSON with the following structure:

{
"title": "5th Grade Math - Fractions & Decimals",
"subject": "Math",
"grade": 5,
"topic": "Fractions and Decimals",
"questions": [
{
"question": "Convert 3/4 into a decimal.",
"type": "multiple-choice",
"options": ["0.5", "0.6", "0.75", "0.8"],
"correct_answer": "0.75",
"difficulty": "easy"
},
{
"question": "What is 1/2 + 3/8?",
"type": "multiple-choice",
"options": ["5/8", "7/8", "1/2", "1"],
"correct_answer": "7/8",
"difficulty": "medium"
},
{
"question": "Lily has 2/3 of a cake and eats 1/4 of it. How much of the cake is left?",
"type": "multiple-choice",
"options": ["1/3", "5/12", "7/12", "1/2"],
"correct_answer": "5/12",
"difficulty": "hard"
}
],
"answer_key": {
"1": "0.75",
"2": "7/8",
"3": "5/12"
}
}`;

  //Future Prompt - use later
  //     const PROMPT = `Generate a 5th-grade math worksheet focused on fractions and decimals.
  // The worksheet should include a variety of problems that test students' understanding of converting fractions to decimals, adding and subtracting fractions, and solving word problems.

  // Ensure that the worksheet is engaging, incorporating real-world scenarios to make learning more interactive.
  // Include a mix of multiple-choice, fill-in-the-blank, and short-answer questions.

  // At the end of the worksheet, provide a complete answer key with step-by-step solutions where necessary.
  // Format the output as JSON with the following structure:

  // {
  //   "title": "5th Grade Math - Fractions & Decimals",
  //   "subject": "Math",
  //   "grade": 5,
  //   "topic": "Fractions and Decimals",
  //   "questions": [
  //     {
  //       "question": "Convert 3/4 into a decimal.",
  //       "type": "short-answer",
  //       "difficulty": "easy"
  //     },
  //     {
  //       "question": "What is 1/2 + 3/8?",
  //       "type": "multiple-choice",
  //       "options": ["5/8", "7/8", "1/2", "1"],
  //       "correct_answer": "7/8",
  //       "difficulty": "medium"
  //     },
  //     {
  //       "question": "Lily has 2/3 of a cake and eats 1/4 of it. How much of the cake is left?",
  //       "type": "word-problem",
  //       "difficulty": "hard"
  //     }
  //   ],
  //   "answer_key": {
  //     "1": "0.75",
  //     "2": "7/8",
  //     "3": "1/2 of the cake is left"
  //   }
  // }`;

  // Generate Course
  // Generate course layout using AI
  const aiResp = await worksheetOutline.sendMessage(PROMPT);
  console.log("AiRESP", aiResp);
  const aiResult = JSON.parse(aiResp.response.text());

  // Save to DB
  const dbResult = await db
    .insert(STUDY_MATERIAL_TABLE)
    .values({
      worksheetId: worksheetId,
      gradeLevel: gradeLevel,
      topic: topic,
      subject: subject,
      worksheetLayout: aiResult,
      createdBy: createdBy,
    })
    .returning({ STUDY_MATERIAL_TABLE });

  console.log("DB Result", dbResult);
  return NextResponse.json({ result: dbResult[0] });
}

// import { db } from "../../../configs/db";
// import { NextResponse } from "next/server";
// import { STUDY_MATERIAL_TABLE } from "../../../configs/schema";
// import { worksheetOutline } from "../../../configs/AiModel";

// export async function POST(req) {
//   try {
//     const { gradeLevel, topic, worksheetId, createdBy, subject } = await req.json();

//     // Define Dynamic Prompt
//     const PROMPT = `Generate a ${gradeLevel} worksheet for ${subject} on ${topic}.
//     The worksheet should include only multiple-choice questions with four answer choices and one correct answer.
//     Ensure it's engaging for students and includes an answer key.
//     Output the result in JSON format.`;

//     // Generate Course Layout using AI
//     const aiResp = await worksheetOutline.sendMessage(PROMPT);
//     console.log("AI Response:", aiResp);

//     // Validate & Parse AI Response
//     const aiText = aiResp?.response?.text?.();
//     if (!aiText) throw new Error("AI response is empty or invalid");

//     let aiResult;
//     try {
//       aiResult = JSON.parse(aiText);
//     } catch (error) {
//       console.error("Error parsing AI response:", error);
//       throw new Error("Failed to parse AI response");
//     }

//     // Save to Database
//     const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
//       worksheetId,
//       gradeLevel,
//       topic,
//       subject,
//       worksheetLayout: aiResult,
//       createdBy,
//     });

//     console.log("DB Result:", dbResult);
//     return NextResponse.json({ result: dbResult });

//   } catch (error) {
//     console.error("Error in POST request:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
