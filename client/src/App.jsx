
// import { Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";

// function App() {
//    return (
//       <Routes>
//          <Route path="/" element={<Login />} />

//          <Route
//             path="/register"
//             element={<Register />}
//          />

//          <Route
//             path="/dashboard"
//             element={<Dashboard />}
//          />
//       </Routes>
//    );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import CoursePage from "./pages/CoursePage";
function App() {
   return (
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/course-one/:id" element={<CoursePage />} />

         <Route
            path="/register"
            element={<Register />}
         />

         <Route
   path="/course/:id"
   element={
      <ProtectedRoute>
         <CourseDetails />
      </ProtectedRoute>
   }
/>

         <Route
            path="/dashboard"
            element={
               <ProtectedRoute>
                  <Dashboard />
               </ProtectedRoute>
            }
         />
      </Routes>
      
   );
}

export default App;