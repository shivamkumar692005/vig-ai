import { getIndustryInsights } from '@/actions/dashboard';
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'
import DashboardView from './_components/DashboardView';

const IndustryInsighPage = async() => {
    const {isOnboarded}:{isOnboarded:boolean} = await getUserOnboardingStatus();
    const rawInsights = await getIndustryInsights();
    // console.log(rawInsights);
    if(!isOnboarded) {
        redirect('/onboarding');
    }
    
    const insights = {
      ...rawInsights,
      salaryRanges: (rawInsights.salaryRanges as { min: number; max: number; role: string; median: number; location: string }[]).filter(Boolean).map((item) => ({
        min: Number(item.min),
        max: Number(item.max),
        role: String(item.role),
        median: Number(item.median),
        location: String(item.location),
      })),
    };

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  )
}

export default IndustryInsighPage