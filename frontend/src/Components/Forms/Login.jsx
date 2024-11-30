import React, { useState } from "react";
import Input from "../Commons/Input";
import Button from "../Commons/Button";
import { login } from "../../Api/Api";
import { useUser } from "../../Contexts/UserContext";

const Login = () => {
  const { login: loginContext } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const inputs = {
      email,
      password,
    };

    login(inputs)
      .then((response) => {
        loginContext(response.data.account);
      })
      .catch((er) => {
        setError(er.response.data.message);
      });
  };

  return (
    <form
      className="bg-slate-800 border-2 border-slate-500 pt-8 rounded-lg shadow-md max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-white text-center">
          Connexion
        </h2>
        <div className="text-red-500 text-sm text-center h-auto">{error}</div>
      </div>

      <div className="py-10 text-center w-3/4 mx-auto">
        <div className="space-y-5">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button classAdd="bg-green-700 hover:bg-green-600 transform hover:scale-110 transition duration-300 mt-8">
          Se connecter
        </Button>
      </div>
    </form>
  );
};

export default Login;
