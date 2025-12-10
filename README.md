# Eatos 🍎
> *Your Intelligent Nutrition Companion*

Eatos is a futuristic, AI-powered nutrition tracking application designed to make healthy eating effortless and engaging. Built with **React Native** (Expo) and styled with a sleek, glassmorphic design system, Eatos leverages **Google Gemini AI** to revolutionize how you log and analyze your meals.

## 🌟 Key Features

*   **📸 AI Food Recognition**: Snap a photo or describe your meal. Eatos uses **Google Gemini AI** to instantly identify dishes, estimate portion sizes, and calculate nutritional breakdown (calories, macros) with impressive accuracy.
*   **🗣️ Voice & Text Logging**: Simply speak or type what you ate. The natural language processing understands context and details, making manual entry a thing of the past.
*   **📊 Comprehensive Analytics**: Visualize your progress with beautiful, interactive charts powered by `victory-native`. Track daily calorie intake, macronutrient distribution (protein, carbs, fats), and long-term trends.
*   **🍽️ Personalized Recommendations**: Get smart meal suggestions based on your dietary goals, preferences, and past eating habits.
*   **🔐 Secure & Private**: Robust authentication and data storage powered by **Firebase** (Auth, Firestore) ensures your health data remains private and secure.
*   **✨ Premium UI/UX**: Experience a modern, fluid interface featuring glassmorphism, smooth animations (`react-native-reanimated`), and haptic feedback (`expo-haptics`) for a delightful user experience.
*   **📱 Cross-Platform**: Optimized for both iOS and Android, offering a native feel on every device.

## 🛠️ Tech Stack

*   **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 52+)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **AI Engine**: [Google Gemini Pro / Flash](https://deepmind.google/technologies/gemini/) (`@google/generative-ai`)
*   **Backend**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage)
*   **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
*   **Styling**: Custom Glassmorphic Design System, `react-native-svg`
*   **Animations**: `react-native-reanimated`
*   **Storage**: `@react-native-async-storage/async-storage`

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   **Node.js** (v18 or newer recommended)
*   **npm** or **yarn**
*   **Expo Go** app on your physical device (iOS/Android) OR an Android Emulator / iOS Simulator.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Sarvesh2005-code/Eatos.git
    cd Eatos/eatos
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your API keys:
    ```env
    EXPO_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
    EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    # Add other Firebase config keys as needed
    ```
    > **Note**: For Firebase Native setup (optional but recommended for production features), ensure `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) are placed in their respective `android/app` and `ios` directories.

4.  **Start the application**
    ```bash
    npx expo start
    ```

5.  **Run on Device/Emulator**
    *   **Physical Device**: Scan the QR code with the **Expo Go** app (Android) or Camera app (iOS).
    *   **Emulator**: Press `a` for Android or `i` for iOS in the terminal.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, features, or improvements.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
