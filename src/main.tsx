
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { GoogleOAuthProvider } from '@react-oauth/google';

  createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="755611304470-vignj30jn6heqctku29f8ohfbelmr387.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  );
