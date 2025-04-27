import { getAssessments } from "@/actions/interview";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";
import StatsCards from "./_components/stats-cards";

interface Question {
  answer: string;
  question: string;
  isCorrect: boolean;
  userAnswer: string;
  explanation: string;
}

interface Assessment {
  id: string;
  userId: string;
  quizScore: number;
  questions: Question[];
  category: string;
  improvementTip: string;
  createdAt: string;
  updatedAt: string;
}

type AssessmentList = Assessment[];

export default async function InterviewPrepPage() {
  const rawAssessments = await getAssessments();

  const assessments: AssessmentList = rawAssessments.map((assessment) => ({
    id: assessment.id,
    userId: assessment.userId,
    quizScore: assessment.quizScore,
    category: assessment.category,
    improvementTip: assessment.improvementTip ?? "",
    createdAt: new Date(assessment.createdAt).toISOString(),
    updatedAt: new Date(assessment.updatedAt).toISOString(),
    questions: assessment.questions as unknown as Question[], 
  }));

  // console.log("Assessments:", assessments);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">
          Interview Preparation
        </h1>
      </div>
      <div className="space-y-6">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}