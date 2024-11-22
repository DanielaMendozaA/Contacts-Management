import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingContextType {
    isOnboardingSeen: boolean | null;
    setIsOnboardingSeen: (value: boolean) => void;
    clearOnboarding: () => Promise<void>;
    markOnboardingSeen: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }>  = ({ children }) => {
    const [isOnboardingSeen, setIsOnboardingSeen] = useState<boolean | null>(null);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            const value = await AsyncStorage.getItem('hasSeenOnboarding');
            setIsOnboardingSeen(value === 'true');
        };
        checkOnboardingStatus();
    }, []);

    const markOnboardingSeen = async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        setIsOnboardingSeen(true);
    };

    const clearOnboarding = async () => {
        await AsyncStorage.removeItem('hasSeenOnboarding');
        setIsOnboardingSeen(false);
    };

    return (
        <OnboardingContext.Provider value={{ isOnboardingSeen, setIsOnboardingSeen, clearOnboarding, markOnboardingSeen }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = (): OnboardingContextType => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};
