import "./App.css";
import AddUser from "./adduser/AddUser";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Update from "./updatenote/Update";
import Note from "./getnotes/Note"
import AddNote from "./addnote/AddNote";
import Login from "./Auth/loginuser/LoginUser";
import Signup from "./Auth/signup/signup";
import VerifyUser from "./Auth/verify/verifyuser";
import FindNotes from "./getnotes/FindNotes";
function App() {
  const route = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/verify",
      element: <VerifyUser />,
    },

    {
      path: '/get-all-notes',
      element: <Note />
    }, 
    {
      path: '/findnote',
      element: <FindNotes />
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
