import React, { useState } from "react";
import Input from "../Commons/Input";
import Button from "../Commons/Button";
import { register } from "../../Api/Api";

const Register = () => {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({ value: "", color: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({value: "", color: ""});

    const inputs = {
      lastname,
      firstname,
      email,
      password,
    };

    register(inputs)
      .then((response) => {
        setError({value: "Le compte à bien été créé", color: "text-green-500"});

        setLastname("");
        setFirstname("");
        setEmail("");
        setPassword("");
      })
      .catch((er) => {
        console.log(er.response?.data); // Pour le débogage
        // Vérifie si l'erreur a des messages spécifiques
        const errorMessage = Array.isArray(er.response?.data.errors)
          ? er.response.data.errors.map((error) => error.msg).join("\n") // Ne pas séparer par une virgule
          : er.response?.data || "Erreur lors de la création du compte";

        // Convertir les messages d'erreur en un tableau d'éléments <div>
        const errorLines = Array.isArray(er.response?.data.errors) ? (
          er.response.data.errors.map((error, index) => (
            <div key={index}>{error.msg}</div>
          ))
        ) : (
          <div>{errorMessage}</div>
        );

        setError({value: errorLines, color: "text-red-500" });
      });
  };

  return (
    <form
      className="bg-slate-800 border-2 border-slate-500 pt-8 rounded-lg shadow-md max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-white text-center">
          Inscription
        </h2>
        <div className={error.color + " text-sm text-center h-auto"}>
          {error.value}
        </div>
      </div>

      <div className="py-10 text-center w-3/4 mx-auto">
        <div className="space-y-5">
          <Input
            type="text"
            placeholder="Nom"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Prénom"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
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
          S'enregister
        </Button>
      </div>
    </form>
  );
};

export default Register;
