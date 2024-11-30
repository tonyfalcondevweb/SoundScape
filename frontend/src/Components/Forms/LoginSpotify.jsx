import spotifyLogo from "/Primary_Logo_White_RGB.svg";
import Container from "../Commons/Container";
import { ENV_PRODUCTION, flexCenterFull } from "../../Utils/Const";
import Button from "../Commons/Button";
import { logout } from "../../Api/Api";
import { useUser } from "../../Contexts/UserContext";

const LoginSpotify = () => {
  const backendUrl = import.meta.env.VITE_API_URL;

  const { logout: contextLogout } = useUser();

  const handleLogout = () => {
    logout()
      .then((response) => {
        console.log(response.data);
        
        contextLogout();
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  return (
    <Container className={flexCenterFull}>
      <div className="px-10 py-6 pb-10 space-y-16 flex flex-col items-center bg-slate-800 text-white border-2 border-slate-500 rounded-lg">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Connectez-vous avec Spotify
        </h1>
        <div>
          <a
            href={`${backendUrl}/spotify/login`}
            className="h-16 border-2 border-slate-200 flex flex-row justify-center items-center space-x-4 px-4 pe-6 text-white transition-transform duration-500 ease-in-out transform rounded-full bg-green-700 hover:bg-green-600 hover:scale-125"
            aria-label="Connectez-vous avec Spotify"
          >
            <img className="h-10" src={spotifyLogo} alt="logo spotify" />
            <span className="h-full flex items-center justify-center text-lg font-medium">
              Se connecter
            </span>
          </a>
          <Button
            classAdd="fixed lg:top-8 lg:right-8 lg:px-6 lg:py-4 top-4 right-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-110 flex items-center gap-2"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default LoginSpotify;
