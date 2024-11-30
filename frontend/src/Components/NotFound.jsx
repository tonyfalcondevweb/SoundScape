import React from "react";
import Container from "./Commons/Container";
import { flexCenterFull } from "../Utils/Const";

const NotFound = () => {
  return (
    <Container className={flexCenterFull}>
      <div className="text-4xl font-medium">Page introuvable</div>
    </Container>
  );
};

export default NotFound;
