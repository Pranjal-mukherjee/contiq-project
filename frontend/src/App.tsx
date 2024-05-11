import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import CreatePasswordPage from "./pages/CreatePasswordPage";
import FilePage from "./pages/Files";
import HomePage from "./pages/HomePage";
import PDFPage from "./pages/PDFViewerPage";
import ResetPasswordPage from "./pages/ResetPassword";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import 'react-datepicker/dist/react-datepicker.css';
import {
  addNewUser,
  generateTokenForUser,
  verifyUser,
} from "./services/UserService";
import theme from "./theme";
import {
  NAVIGATE_CREATEPASSWORD,
  NAVIGATE_FILES,
  NAVIGATE_HOME,
  NAVIGATE_PDF,
  NAVIGATE_RESETPASSWORD,
  NAVIGATE_SIGNIN,
  NAVIGATE_SIGNUP,
} from "./utils/constants";

export const ROUTES = [
  {
    path: NAVIGATE_SIGNIN,
    element: <SignInPage />,
  },
  {
    path: NAVIGATE_CREATEPASSWORD,
    element: <CreatePasswordPage />,
  },
  {
    path: NAVIGATE_RESETPASSWORD,
    element: <ResetPasswordPage />,
  },
  {
    path: NAVIGATE_HOME,
    element: <HomePage />,
  },
  {
    path: NAVIGATE_SIGNUP,
    element: <SignUpPage />,
  },
  {
    path: NAVIGATE_PDF,
    element: (
      <AuthRoute>
        <PDFPage />
      </AuthRoute>
    ),
  },
  {
    path: NAVIGATE_FILES,
    element: (
      <AuthRoute>
        <FilePage />
      </AuthRoute>
    ),
  },
];

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const addAuthUser = async (name: string, email: string) => {
    await generateTokenForUser(email, "Pra@1234").then((res) =>
      sessionStorage.setItem("token", res)
    );

    const authUser = await verifyUser(email);
    if (!authUser) {
      const newAuthUser = await addNewUser(name, email, "Pra@1234");
      if (!newAuthUser) {
        window.alert("Some error occurred while adding the new user");
      }
    }
  };
  if (isAuthenticated && user && user.email && user.name) {
    addAuthUser(user.name, user.email);
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
