import { CssBaseline } from "@mui/material";
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);

const theme = createTheme({
    components: {
        MuiPopover: {
            defaultProps: {
                container: rootElement
            }
        },
        MuiPopper: {
            defaultProps: {
                container: rootElement
            }
        }
    }
});

root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);
