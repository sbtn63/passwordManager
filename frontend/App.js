import { AuthProvider } from "./context/AuthContext";
import Navigation from "./src/components/Navigation"

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
