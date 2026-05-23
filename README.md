# Interview Questions Generator

Preparing for an interview shouldn't be a manual grind. The **Interview Questions Generator** is an AI-driven tool designed to help job seekers and recruiters instantly generate high-quality, role-specific interview questions. 

By leveraging Google's Gemini 3.5 Flash AI, the app translates a simple job title into three high-impact questions designed to probe for both technical depth and behavioral fit.

## ✨ Key Features

-   **Intelligent Tailoring**: Generates questions specifically crafted for the job title provided.
-   **Quick Start Suggestions**: Includes one-tap suggestions for common roles like "Data Scientist" or "UX Designer."
-   **Fluid User Experience**:
    -   **Auto-growing Input**: The interface expands as you type for a comfortable drafting experience.
    -   **One-Click Copy**: Instantly copy generated questions to your clipboard.
    -   **Loading Highlights**: Educates users on best practices via animated highlights while the AI generates responses.
-   **Reliable Performance**: Built-in error handling for rate limits, network issues, and service outages.

## 🚀 Getting Started

Follow these steps to get the application running on your local development machine.

### Prerequisites

-   **Node.js**: v22.0.0 or higher
-   **npm**: usually comes with Node.js

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/primeace7/interview-questions-app.git
    cd interview-questions-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory based on the `.env.example` file and fill in your Firebase credentials.
    ```bash
    cp .env.example .env
    ```

4.  **Launch the App**
    ```bash
    npm run dev
    ```
    The app will typically be available at `http://localhost:3000`.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v3 |
| Validation | Zod |
| Inference | Gemini via Firebase AI Logic |
| AI Model | Google Gemini 3.5 Flash |

## 📂 Project Structure

```
interview-questions-app/
├── public/
├── src/
│   ├── components/
│   │   ├── AutoResizeTextarea.tsx   # Auto-growing textarea for user input
│   │   ├── ErrorMessage.tsx         # Typed error display
│   │   ├── LoadingHighlights.tsx    # Animated feature highlights during loading
│   │   ├── ResultCard.tsx           # Question result display with copy button
│   │   └── SuggestedInputs.tsx      # Clickable suggestion chips
│   ├── hooks/
│   │   ├── useCopyToClipboard.ts    # Clipboard copy with reset
│   │   └── useInference.ts          # Main inference hook (submit, retry, clear)
│   ├── lib/
│   │   ├── errorClassifier.ts       # Maps errors to typed AppError
│   │   ├── featureHighlights.ts     # Loading animation feature data
│   │   └── firebase.ts              # Firebase init + callable wrapper
│   ├── types/
│   │   └── inference.ts             # Zod schemas + TypeScript types
│   ├── App.tsx
│   └── index.tsx
├── firebase.json
├── .firebaserc
├── .env.example
└── README.md
```



## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |


## 🛡 Error Handling

The app gracefully handles:

| Scenario | Behaviour |
|----------|-----------|
| **Offline / no network** | "You appear to be offline…" message |
| **API rate limit / quota exceeded** | "We've hit the API rate limit…" message |
| **Gemini API unavailable** | "The AI provider service is currently unavailable…" message |
| **Invalid response / validation failure** | Auto-retry once; friendly error if retry also fails |


## ⚙️ Customisation

- **Loading animation duration**: change `DURATION_SECONDS` in `src/components/LoadingHighlights.tsx`
- **Max retry count**: change `MAX_RETRIES` in `src/hooks/useInference.ts`
- **Gemini model**: change the model string in `functions/src/index.ts`
