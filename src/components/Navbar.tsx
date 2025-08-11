//import React from 'react'
import { Nav, Col, Row } from "react-bootstrap";
//import { animate } from "animejs";

interface Props {
  currentPG: string;
  onChange: (pg: string) => void;
}

const Navbar = ({ currentPG, onChange }: Props) => {
  const pages = [
    "home",
    "characters",
    "campaigns",
    "notebook",
    "world",
    "lore",
    "homebrew",
  ];

  return (
    <>
      <Nav activeKey={currentPG} className="vert-Nav">
        <Col>
          {pages.map((page, index) => (
            <Row
              key={index}
              className={!(page === currentPG) ? "inactive" : "active"}
            >
              <Nav.Item>
                <Nav.Link
                  eventKey={page}
                  href={"#" + page}
                  onClick={() => onChange(page)}
                >
                  {page.replace(page[0], page[0].toUpperCase())}
                </Nav.Link>
              </Nav.Item>
            </Row>
          ))}
          <span id="sideRibbon" />
        </Col>
      </Nav>
    </>
  );
};

export default Navbar;
