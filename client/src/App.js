import "./App.css";
import AddUser from "./adduser/AddUser";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Update from "./updatenote/Update";
import Note from "./getnotes/Note"
import AddNote from "./addnote/AddNote";
import Login from "./Auth/loginuser/LoginUser";
import Signup from "./Auth/signup/signup";
import VerifyUser from "./Auth/verify/verifyuser";
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verify",
      element: <VerifyUser />,
    },


    {
      path: '/note',
      element: <Note />
    }, 

    {
      path: "/add",
      element: <AddNote />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
