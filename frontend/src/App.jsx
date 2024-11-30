import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from "./Components/Result";
import NotFound from "./Components/NotFound";
import SpotifyAccessRoutes from "./Routes/SpotifyAccesRoutes";
import AuthPortal from "./Components/Forms/AuthPortal";
import { UserProvider, useUser } from './Contexts/UserContext';
import AuthWrapper from "./Components/AuthWrapper";
import PublicRoutes from "./Routes/PublicRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import LoginSpotify from "./Components/Forms/LoginSpotify";
import { SpotifyProvider } from "./Contexts/SpotifyContext";



function App() {

  return (
    <UserProvider>
      <SpotifyProvider>
      <AuthWrapper>
        <Router>
          <Routes>

            {/* Route non trouvée */}
            <Route path="*" element={<NotFound />} />

            {/* Routes publiques */}            
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<AuthPortal />} />
            </Route>

            {/* Routes privées */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/spotifyAuth" element={<LoginSpotify />} />
            </Route>

            {/* Routes Spotify */}
            <Route element={<SpotifyAccessRoutes />}>
              <Route path="/dashboard" element={<Result />} />
            </Route>
            
          </Routes>
        </Router>
      </AuthWrapper>
      </SpotifyProvider>
    </UserProvider>
  );
}

export default App;
