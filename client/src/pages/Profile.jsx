

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import ThemeSelector from "../components/ThemeSelector";
// import PremiumPayment from "../components/PremiumPayment";
// function Profile() {

//    const [user, setUser] =
//       useState(null);
// <ThemeSelector />
//    const [image, setImage] =
//       useState(null);

//    useEffect(() => {

//       fetchProfile();

//    }, []);

//    const fetchProfile =
//       async () => {

//          try {

//             const response =
//                await API.get(
//                   "/user/profile"
//                );

//             setUser(
//                response.data
//             );

//          } catch (error) {

//             console.log(error);

//          }
//       };

//    const uploadPhoto =
//       async () => {

//          if (!image) return;

//          const formData =
//             new FormData();

//          formData.append(
//             "profilePic",
//             image
//          );

//          try {

//             await API.post(
//                "/user/upload-photo",
//                formData,
//                {
//                   headers: {
//                      "Content-Type":
//                         "multipart/form-data",
//                   },
//                }
//             );

//             alert(
//                "Photo Uploaded"
//             );

//             fetchProfile();

//          } catch (error) {

//             console.log(error);

//          }
//       };

//    if (!user)
//       return <h1>Loading...</h1>;

//    const deletePhoto =
//    async () => {

//       try {

//          await API.delete(
//             "/user/delete-photo"
//          );

//          alert(
//             "Photo Deleted"
//          );

//          fetchProfile();

//       } catch (error) {

//          console.log(error);

//       }
//    };

//    return (

//       <div className="p-8">

//          <div className="bg-white p-6 rounded shadow max-w-md mx-auto">

//             <h1 className="text-3xl font-bold mb-6">
//                👤 User Profile
//             </h1>

//             {user.profilePic ? (

//                <img
//                   src={`http://localhost:5000/uploads/${user.profilePic}`}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
//                />

//             ) : (

//                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-5xl mx-auto mb-4">
//    👤
// </div>

//             )}

//             <input
//                type="file"
//                onChange={(e) =>
//                   setImage(
//                      e.target.files[0]
//                   )
//                }
//                className="mb-3"
//             />

//             <div className="flex gap-2 mt-2">

//    <button
//       onClick={uploadPhoto}
//       className="bg-blue-500 text-white px-4 py-2 rounded"
//    >
//       Upload Photo
//    </button>

//    {user.profilePic && (

//       <button
//          onClick={deletePhoto}
//          className="bg-red-500 text-white px-4 py-2 rounded"
//       >
//          Delete Photo
//       </button>

//    )}

// </div>
            

//             <p className="mt-4">
//                <strong>Name:</strong>{" "}
//                {user.name}
//             </p>

//             <p className="mt-2">
//                <strong>Email:</strong>{" "}
//                {user.email}
//             </p>

//             <p className="mt-2">
//                <strong>Joined:</strong>{" "}
//                {new Date(
//                   user.createdAt
//                ).toLocaleDateString()}
//             </p>

//             <p className="mt-4 text-green-600 font-bold">
//                Verified User ✅
//             </p>

//             <div className="mt-6">
//                <PremiumPayment />
//             </div>


//          </div>
         

//       </div>

      
//    );
// }

// export default Profile;

import { useEffect, useState } from "react";
import API from "../services/api";
import PremiumPayment from "../components/PremiumPayment";

function Profile() {
   const [user, setUser] = useState(null);
   const [image, setImage] = useState(null);
   const [loading, setLoading] = useState(true);
   const [showPayment, setShowPayment] = useState(false);

   useEffect(() => {
      fetchProfile();
   }, []);

   const fetchProfile = async () => {
      try {
         const response = await API.get(
            "/user/profile"
         );

         setUser(response.data);

      } catch (error) {
         console.log(
            "PROFILE ERROR:",
            error.response?.data || error.message
         );

      } finally {
         setLoading(false);
      }
   };

   const uploadPhoto = async () => {
      if (!image) {
         alert("Please select an image");
         return;
      }

      const formData = new FormData();

      formData.append(
         "profilePic",
         image
      );

      try {
         await API.post(
            "/user/upload-photo",
            formData
         );

         alert("Photo Uploaded");

         setImage(null);

         fetchProfile();

      } catch (error) {
         console.log(
            "UPLOAD ERROR:",
            error.response?.data || error.message
         );
      }
   };

   const deletePhoto = async () => {
      try {
         await API.delete(
            "/user/delete-photo"
         );

         alert("Photo Deleted");

         fetchProfile();

      } catch (error) {
         console.log(
            "DELETE ERROR:",
            error.response?.data || error.message
         );
      }
   };

   if (loading) {
      return (
         <div className="flex justify-center items-center h-screen">
            <h1>Loading Profile...</h1>
         </div>
      );
   }

   if (!user) {
      return (
         <div className="flex justify-center items-center h-screen">
            <h1>Profile not found</h1>
         </div>
      );
   }

   return (
      <div className="p-8">

         <div className="bg-white p-6 rounded shadow max-w-md mx-auto">

            <h1 className="text-3xl font-bold mb-6">
               👤 User Profile
            </h1>

            {user.profilePic ? (
               <img
                  src={`http://localhost:5000/uploads/${user.profilePic}`}
                  alt="Profile"
                  loading="lazy"
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
               />
            ) : (
               <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-5xl mx-auto mb-4">
                  👤
               </div>
            )}

            <input
               type="file"
               accept="image/*"
               onChange={(e) =>
                  setImage(e.target.files[0])
               }
               className="mb-3"
            />

            <div className="flex gap-2 mt-2">

               <button
                  onClick={uploadPhoto}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
               >
                  Upload Photo
               </button>

               {user.profilePic && (
                  <button
                     onClick={deletePhoto}
                     className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                     Delete Photo
                  </button>
               )}

            </div>

            <p className="mt-4">
               <strong>Name:</strong>{" "}
               {user.name}
            </p>

            <p className="mt-2">
               <strong>Email:</strong>{" "}
               {user.email}
            </p>

            <p className="mt-2">
               <strong>Joined:</strong>{" "}
               {new Date(
                  user.createdAt
               ).toLocaleDateString()}
            </p>

            <p className="mt-4 text-green-600 font-bold">
               Verified User ✅
            </p>

            <div className="mt-6">

               {!showPayment ? (
                  <button
                     onClick={() =>
                        setShowPayment(true)
                     }
                     className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                     Upgrade to Premium
                  </button>
               ) : (
                  <PremiumPayment />
               )}

            </div>

         </div>

      </div>
   );
}

export default Profile;