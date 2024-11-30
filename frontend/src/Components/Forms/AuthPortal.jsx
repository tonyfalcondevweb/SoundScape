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
      <div className="flex lg:flex-row flex-col lg:space-x-20 space-y-20 items-center justify-center">
        <Login setLoad={setLoad} />

        <div className="lg:h-60 lg:w-2 h-2 w-60 bg-slate-800 mx-4 rounded-full"></div>

        <Register setLoad={setLoad} />
      </div>
    </Container>
  );
};

export default AuthPortal;
