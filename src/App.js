import { Box, Typography } from "@mui/material";
import { Provider } from "react-redux";
import store from "./app/store";
import PropertyList from "./features/properties/PropertyList";
import landaIcon from "./assets/landa.png";
import ScrollToTop from "./app/components/ScrollToTop";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Box display="flex" alignItems="center" justifyContent="center">
          <img height={36} src={landaIcon} />
          <Typography fontSize={36} p={1} textAlign="center" fontWeight="bold">
            MiniLanda
          </Typography>
        </Box>
        <ScrollToTop />
        <PropertyList />
      </div>
    </Provider>
  );
}

export default App;
