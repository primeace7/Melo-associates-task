import { geminiModel } from "./firebase";

export const generateInterviewQuestions = async ({
  jobTitle,
}: {
  jobTitle: string;
}) => {
  const result = await geminiModel.generateContent(jobTitle);
  return result.response.text();
};
