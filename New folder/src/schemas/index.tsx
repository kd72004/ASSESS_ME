import { z } from "zod";

export const formSchema = z.object({
  email: z.string().min(2, {
    message: "Please enter email",
  }),
  password: z.string().min(2, {
    message: "Please enter Password",
  }),
});

export const regiSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter Name",
  }),
  email: z.string().min(2, {
    message: "Please enter email",
  }),
  password: z.string().min(2, {
    message: "Please enter Password",
  }),
});

export const examformSchema = z.object({
  examName: z.string().min(1, "Exam name is required"),
  subject: z.string().min(1, "Subject is required"),
  startDate: z.date(),
  endDate: z.date(),
  duration: z.number().min(1, "Duration must be at least 1"),
  totalMarks: z.number().min(1, "Total marks must be at least 1"),
  numberOfQuestions: z.number().min(5, "Must be at least 5 question"),
  instructions: z.string().optional(),
  passingMarks: z.number().min(1, "Passing marks must be at least 1"),
});
