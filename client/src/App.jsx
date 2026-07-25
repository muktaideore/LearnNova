
// import { Routes, Route } from "react-router-dom";
// import VerifyEmail from "./pages/VerifyEmail";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import CourseDetails from "./pages/CourseDetails";
// import ProtectedRoute from "./components/ProtectedRoute";
// import CoursePage from "./pages/CoursePage";
// import Bookmarks from "./pages/Bookmarks";
// import Profile from "./pages/Profile";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import Analytics from "./pages/Analytics";
// import Certificates from "./pages/Certificates";
// import StudyCalendar from "./pages/StudyCalendar";
// import GroupStudy from "./pages/GroupStudy";
// //import InviteMember from "./pages/InviteMember";
// import Invitations from "./pages/Invitations";
// import AcceptInvitation from "./pages/AcceptInvitation";
// import StudyRoom from "./pages/StudyRoom";
// import ThemeSelector from "./components/ThemeSelector";
// function App() {
//    return (
      

//       function App() {

//    return (

//       <BrowserRouter>

//          <ThemeSelector />

//          <Routes>

//             {/* your existing routes */}

//          </Routes>
//          <Routes>
//          <Route path="/" element={<Login />} />
//          <Route path="/login" element={<Login />} />
//          <Route path="/course-one/:id" element={<CoursePage />} />
// <Route
//    path="/certificates"
//    element={<Certificates />}
// />
// <Route
//    path="/accept-invite/:id"
//    element={<AcceptInvitation />}
// />


//          <Route
//             path="/register"
//             element={<Register />}
//          />
//          <Route
//    path="/profile"
//    element={
//       <ProtectedRoute>
//          <Profile />
//       </ProtectedRoute>
//    }
// />
// <Route
//    path="/invitations"
//    element={
//       <ProtectedRoute>
//          <Invitations />
//       </ProtectedRoute>
//    }
// />
// <Route
//    path="/group-study"
//    element={
//       <ProtectedRoute>
//          <GroupStudy />
//       </ProtectedRoute>
//    }
// />
// <Route
//    path="/group-study/:roomId"
//    element={<StudyRoom />}
// />

//          <Route
//    path="/course/:id"
//    element={
//       <ProtectedRoute>
//          <CourseDetails />
//       </ProtectedRoute>
//    }
// />
// <Route
//    path="/verify-email"
//    element={<VerifyEmail />}
// />

// <Route
//    path="/bookmarks"
//    element={<Bookmarks />}
// />


// <Route
//    path="/analytics"
//    element={
//       <ProtectedRoute>
//          <Analytics />
//       </ProtectedRoute>
//    }
// />
// <Route
//    path="/forgot-password"
//    element={<ForgotPassword />}
// />
// <Route
//    path="/study-calendar"
//    element={
//       <ProtectedRoute>
//          <StudyCalendar />
//       </ProtectedRoute>
//    }
// />

// <Route
//    path="/reset-password"
//    element={<ResetPassword />}
// />
//          <Route
//             path="/dashboard"
//             element={
//                <ProtectedRoute>
//                   <Dashboard />
//                </ProtectedRoute>
//             }
//          />
//       </Routes>

//       </BrowserRouter>

//    );

// }

      

      
      
//    );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import CoursePage from "./pages/CoursePage";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Analytics from "./pages/Analytics";
import Certificates from "./pages/Certificates";
import StudyCalendar from "./pages/StudyCalendar";
import GroupStudy from "./pages/GroupStudy";
import Invitations from "./pages/Invitations";
import AcceptInvitation from "./pages/AcceptInvitation";
import StudyRoom from "./pages/StudyRoom";
import Landing from "./pages/Landing";



function App() {

   return (

      <>

         {/* Global Theme Button */}

        


         {/* All Routes */}

         <Routes>

            {/* Login */}

            {/* <Route
               path="/"
               element={<Login />}
            /> */}

           <Route path="/" element={<Landing />} />
           <Route path="/login" element={<Login />} />


            {/* Register */}

            <Route
               path="/register"
               element={<Register />}
            />


            {/* Email Verification */}

            <Route
               path="/verify-email"
               element={<VerifyEmail />}
            />


            {/* Forgot Password */}

            <Route
               path="/forgot-password"
               element={<ForgotPassword />}
            />

            <Route
               path="/reset-password"
               element={<ResetPassword />}
            />


            {/* Course Page */}

            <Route
               path="/course-one/:id"
               element={<CoursePage />}
            />


            <Route
               path="/course/:id"
               element={
                  <ProtectedRoute>
                     <CourseDetails />
                  </ProtectedRoute>
               }
            />


            {/* Dashboard */}

            <Route
               path="/dashboard"
               element={
                  <ProtectedRoute>
                     <Dashboard />
                  </ProtectedRoute>
               }
            />


            {/* Profile */}

            <Route
               path="/profile"
               element={
                  <ProtectedRoute>
                     <Profile />
                  </ProtectedRoute>
               }
            />


            {/* Bookmarks */}

            <Route
               path="/bookmarks"
               element={
                  <ProtectedRoute>
                     <Bookmarks />
                  </ProtectedRoute>
               }
            />


            {/* Analytics */}

            <Route
               path="/analytics"
               element={
                  <ProtectedRoute>
                     <Analytics />
                  </ProtectedRoute>
               }
            />


            {/* Certificates */}

            <Route
               path="/certificates"
               element={
                  <ProtectedRoute>
                     <Certificates />
                  </ProtectedRoute>
               }
            />


            {/* Study Calendar */}

            <Route
               path="/study-calendar"
               element={
                  <ProtectedRoute>
                     <StudyCalendar />
                  </ProtectedRoute>
               }
            />


            {/* Group Study */}

            <Route
               path="/group-study"
               element={
                  <ProtectedRoute>
                     <GroupStudy />
                  </ProtectedRoute>
               }
            />


            {/* Individual Study Room */}

            <Route
               path="/group-study/:roomId"
               element={
                  <ProtectedRoute>
                     <StudyRoom />
                  </ProtectedRoute>
               }
            />


            {/* Invitations */}

            <Route
               path="/invitations"
               element={
                  <ProtectedRoute>
                     <Invitations />
                  </ProtectedRoute>
               }
            />


            {/* Accept Invitation */}

            <Route
               path="/accept-invite/:id"
               element={<AcceptInvitation />}
            />

         </Routes>

      </>

   );

}

export default App;