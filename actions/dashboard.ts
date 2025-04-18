"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface SalaryRange {
    role: string;
    min: number;
    max: number;
    median: number;
    location: string;
}

interface AIInsights {
    salaryRanges: SalaryRange[];
    growthRate: number;
    demandLevel: "High" | "Medium" | "Low";
    topSkills: string[];
    marketOutlook: "Positive" | "Neutral" | "Negative";
    keyTrends: string[];
    recommendedSkills: string[];
}

const generateAIInsightsInternal = async (industry: string): Promise<AIInsights> => {
    const prompt = `
                    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
                    {
                        "salaryRanges": [
                            { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
                        ],
                        "growthRate": number,
                        "demandLevel": "High" | "Medium" | "Low",
                        "topSkills": ["skill1", "skill2"],
                        "marketOutlook": "Positive" | "Neutral" | "Negative",
                        "keyTrends": ["trend1", "trend2"],
                        "recommendedSkills": ["skill1", "skill2"]
                    }
                    
                    IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
                    Include at least 5 common roles for salary ranges.
                    Growth rate should be a percentage.
                    Include at least 5 skills and trends.
                `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText) as AIInsights;
};

export const generateAIInsights: (industry: string) => Promise<AIInsights> = generateAIInsightsInternal;

export async function getIndustryInsights() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        include: { industryInsight: true },
    });

    if (!user) {
        throw new Error("User not found");
    }
    if (!user.industryInsight) {
        if (!user.industry) {
            throw new Error("User industry is not defined");
        }
        const insights = await generateAIInsights(user.industry);

        const industryInsight = await db.industryInsight.create({
            data: {
                industry: user.industry,
                salaryRanges: JSON.parse(JSON.stringify(insights.salaryRanges)),
                growthRate: insights.growthRate,
                demandLevel: insights.demandLevel,
                topSkills: insights.topSkills,
                marketOutlook: insights.marketOutlook,
                keyTrends: insights.keyTrends,
                recommendedSkills: insights.recommendedSkills,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        return industryInsight;
    }

    return user.industryInsight;
}