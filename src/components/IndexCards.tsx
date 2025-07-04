//import React from 'react'
import SignIn from "./SignIn";
import Explore from "./Explore";
import Request from "./Request";
import { useState } from "react";
import { Card, Collapse, Button } from "react-bootstrap";

interface Props {
  title: "Enter" | "Request" | "Explore";
}

const IndexCards = ({ title }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <Button
              variant="outline-primary"
              aria-controls={title + "Content"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {title}
            </Button>
          </Card.Title>
          <Card.Text>
            {(() => {
              switch (title) {
                case "Enter":
                  return <SignIn />;
                case "Explore":
                  return <Explore />;
                case "Request":
                  return <Request />;
              }
            })()}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default IndexCards;
