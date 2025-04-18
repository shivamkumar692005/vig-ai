"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";

interface UpdateUserData {
  industry: string;
  experience: string;
  bio: string;
  skills: string[];
}

interface IndustryInsight {
  industry: string;
  salaryRanges: { min: number; max: number }[];
  growthRate: number;
  demandLevel: string;
  topSkills: string[];
  marketOutlook: string;
  keyTrends: string[];
  recommendedSkills: string[];
  nextUpdate: Date;
}

type UpdateUserResponse = {
  id: string;
  industry: string;
  experience: number;
  updatedUser: {
    id: string;
    industry: string;
    experience: number;
  };
  industryInsight: IndustryInsight;
  success: boolean;
};

export async function updateUser(
  data: UpdateUserData
): Promise<UpdateUserResponse> {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  let industryInsight = await db.industryInsight.findUnique({
    where: { industry: data.industry },
  });

  // Only call generateAIInsights if industry insight is not present
  if (!industryInsight) {
    if (!data.industry) {
      throw new Error("User industry is not defined");
    }

    const insights = await generateAIInsights(data.industry);

    industryInsight = await db.industryInsight.create({
      data: {
        industry: data.industry,
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
  }

  try {
    const updatedUser = await db.user.update({
      where: { clerkUserId: userId },
      data: {
        industry: data.industry,
        experience: parseInt(data.experience, 10),
        bio: data.bio,
        skills: data.skills,
      },
    });

    return {
      id: updatedUser.id,
      industry: updatedUser.industry ?? "",
      experience: updatedUser.experience ?? 0,
      updatedUser: {
        id: updatedUser.id,
        industry: updatedUser.industry ?? "",
        experience: updatedUser.experience ?? 0,
      },
      industryInsight: {
        ...industryInsight,
        salaryRanges: industryInsight.salaryRanges as { min: number; max: number }[],
      },
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating user:", error.message);
    } else {
      console.error("An unknown error occurred while updating user:", error);
    }
    throw new Error("Error updating user");
  }
}


export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error checking onboarding status:", error.message);
    } else {
      console.error(
        "An unknown error occurred while checking onboarding status:",
        error
      );
    }
    throw new Error("Failed to check onboarding status");
  }
}
