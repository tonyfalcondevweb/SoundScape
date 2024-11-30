import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Loading from "../Commons/Loading";
import Container from "../Commons/Container";

const AuthPortal = () => {
  const [load, setLoad] = useState(false);

  if (load) {
    return <Loading />;
  }

  return (
    <Container className="flex justify-center items-center">
      <div className="flex flex-row space-x-20 items-center justify-center">
        <Login setLoad={setLoad} />

        <div className="h-60 w-2 bg-slate-800 mx-4 rounded-full"></div>

        <Register setLoad={setLoad} />
      </div>
    </Container>
  );
};

export default AuthPortal;
