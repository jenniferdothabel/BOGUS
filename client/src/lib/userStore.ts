import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  name: string;
  role: string;
  inmateName: string;
  inmateId: string;
  facility: string;
  isOnboarded: boolean;
}

interface UserState {
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: {
        name: "Maria Rodriguez",
        role: "Mother/Guardian",
        inmateName: "Joseph 'Joe' Rodriguez",
        inmateId: "CDCR #T-12345",
        facility: "Corcoran State Prison",
        isOnboarded: false, // Default to false to show onboarding for demo purposes if we were starting fresh, but for the prototype flow we might want to force it. 
        // Actually, let's toggle this to 'false' initially if no state exists, but since we already showed the dashboard, 
        // I will implement logic in App.tsx to redirect if this is false.
      },
      setProfile: (updates) => set((state) => ({ 
        profile: { ...state.profile, ...updates } 
      })),
      completeOnboarding: () => set((state) => ({ 
        profile: { ...state.profile, isOnboarded: true } 
      })),
      reset: () => set({ 
        profile: {
          name: "",
          role: "",
          inmateName: "",
          inmateId: "",
          facility: "",
          isOnboarded: false
        }
      })
    }),
    {
      name: 'bogus-user-storage',
    }
  )
);
