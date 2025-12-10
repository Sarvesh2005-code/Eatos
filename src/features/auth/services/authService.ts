import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';

// Constants for secure storage keys
const USER_AUTH_KEY = 'eatos_user_auth';
const USER_PROFILE_KEY = 'eatos_user_profile';

/**
 * Authentication service for Eatos app
 * Handles user authentication, registration, and profile management
 */
export class AuthService {
  /**
   * Initialize the authentication service
   */
  static init() {
    // Configure Google Sign-In
    /*
    try {
      GoogleSignin.configure({
        webClientId: '', // Add your web client ID from Google Cloud Console
      });
    } catch (e) {
      console.warn('GoogleSignin configure failed (expected in Expo Go):', e);
    }
    */
  }

  // ... (registerWithEmail and signInWithEmail remain unchanged)

  static async registerWithEmail(email: string, password: string): Promise<FirebaseAuthTypes.User | null> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async signInWithEmail(email: string, password: string): Promise<FirebaseAuthTypes.User | null> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      await this.saveUserToSecureStorage(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<FirebaseAuthTypes.User | null> {
    throw new Error('Google Sign-In is not supported in Expo Go. Please use a development build.');
    /*
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      await this.saveUserToSecureStorage(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
    */
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<void> {
    try {
      await auth().signOut();
      // await GoogleSignin.signOut();
      await this.clearUserFromSecureStorage();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  /**
   * Reset password for a user
   */
  static async resetPassword(email: string): Promise<void> {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  /**
   * Get the current authenticated user
   */
  static getCurrentUser(): FirebaseAuthTypes.User | null {
    return auth().currentUser;
  }

  /**
   * Check if a user is currently authenticated
   */
  static isAuthenticated(): boolean {
    return auth().currentUser !== null;
  }

  /**
   * Save user data to secure storage
   */
  private static async saveUserToSecureStorage(user: FirebaseAuthTypes.User): Promise<void> {
    try {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      await SecureStore.setItemAsync(USER_AUTH_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user to secure storage:', error);
    }
  }

  /**
   * Get user data from secure storage
   */
  static async getUserFromSecureStorage(): Promise<any | null> {
    try {
      const userData = await SecureStore.getItemAsync(USER_AUTH_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user from secure storage:', error);
      return null;
    }
  }

  /**
   * Clear user data from secure storage
   */
  private static async clearUserFromSecureStorage(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(USER_AUTH_KEY);
      await SecureStore.deleteItemAsync(USER_PROFILE_KEY);
    } catch (error) {
      console.error('Error clearing user from secure storage:', error);
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(displayName: string, photoURL?: string): Promise<void> {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.updateProfile({
          displayName,
          photoURL: photoURL || currentUser.photoURL,
        });
        // Update secure storage with new profile data
        await this.saveUserToSecureStorage(currentUser);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}