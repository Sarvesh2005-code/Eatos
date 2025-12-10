import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { AuthService } from '@/features/auth/services/authService';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth service
    AuthService.init();

    // Subscribe to auth state changes
    const unsubscribe = AuthService.getCurrentUser()?.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    // Check for cached user
    const checkCachedUser = async () => {
      try {
        const cachedUser = await AuthService.getUserFromSecureStorage();
        if (cachedUser && !user) {
          // If we have a cached user but no Firebase user, we'll use the cached data
          // until Firebase auth state is resolved
          setUser(cachedUser as any);
        }
      } catch (error) {
        console.error('Error checking cached user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkCachedUser();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const authUser = await AuthService.signInWithEmail(email, password);
      setUser(authUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const authUser = await AuthService.signInWithGoogle();
      setUser(authUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const authUser = await AuthService.registerWithEmail(email, password);
      setUser(authUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await AuthService.signOut();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await AuthService.resetPassword(email);
  };

  const updateProfile = async (displayName: string, photoURL?: string) => {
    setIsLoading(true);
    try {
      await AuthService.updateUserProfile(displayName, photoURL);
      // Update local user state
      if (user) {
        setUser({
          ...user,
          displayName,
          photoURL: photoURL || user.photoURL,
        } as FirebaseAuthTypes.User);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};