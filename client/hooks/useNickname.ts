import { useUser } from "@clerk/clerk-expo"

export const useUserIdAndNickname = () => {
  const { user } = useUser();

  return { userId: user?.id || '', nickname: user?.primaryEmailAddress?.emailAddress.split('@')[0] || '' } as const;
}