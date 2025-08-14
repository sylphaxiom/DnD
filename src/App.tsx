import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

function App() {
  const [page, setPage] = React.useState("home");
  const handleSelect = (pg: string) => {
    setPage(pg);
  };

  return (
    <>
      <Box sx={{ height: "100%", minWidth: "100vw" }} position="fixed" top={0}>
        <Container
          disableGutters
          sx={{ mx: 0, minWidth: "100vw", height: "100%" }}
        >
          <Grid container spacing={0}>
            <Grid size={2}>
              <Navbar current={page} onChange={handleSelect} />
            </Grid>
            <Grid size={7}>
              <Title />
            </Grid>
            <Grid size={3}></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default App;
