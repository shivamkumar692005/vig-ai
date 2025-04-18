import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/OnboardingForm'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'

const Onboarding = async() => {
  const { isOnboarded }: { isOnboarded: boolean } = await getUserOnboardingStatus();

  if(isOnboarded) {
    redirect('/dashboard');
  }
  return (
    <main>
    <OnboardingForm industries={industries} />
  </main>
  )
}

export default Onboarding