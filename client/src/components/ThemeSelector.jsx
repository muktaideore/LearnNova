// // import { useEffect, useState } from "react";

// // function ThemeSelector() {

// //    const themes = [
// //       "light",
// //       "dark",
// //       "cupcake",
// //       "bumblebee",
// //       "emerald",
// //       "corporate",
// //       "synthwave",
// //       "retro",
// //       "cyberpunk",
// //       "valentine",
// //       "halloween",
// //       "garden",
// //       "forest",
// //       "aqua",
// //       "lofi",
// //       "pastel",
// //       "fantasy",
// //       "black",
// //       "luxury",
// //       "dracula",
// //       "autumn",
// //       "business",
// //       "lemonade",
// //       "night",
// //       "coffee",
// //       "winter",
// //       "dim",
// //       "nord",
// //       "sunset",
// //    ];

// //    const [currentTheme, setCurrentTheme] = useState("light");

// //    useEffect(() => {

// //       const savedTheme =
// //          localStorage.getItem("learnify-theme") || "light";

// //       document.documentElement.setAttribute(
// //          "data-theme",
// //          savedTheme
// //       );

// //       setCurrentTheme(savedTheme);

// //    }, []);

// //    const changeTheme = (theme) => {

// //       document.documentElement.setAttribute(
// //          "data-theme",
// //          theme
// //       );

// //       localStorage.setItem(
// //          "learnify-theme",
// //          theme
// //       );

// //       setCurrentTheme(theme);

// //    };

// //    return (

// //       <div className="dropdown dropdown-end fixed top-5 right-5 z-50">

// //          <button
// //             tabIndex={0}
// //             className="btn btn-primary shadow-lg"
// //          >
// //             🎨 Theme
// //          </button>

// //          <ul
// //             tabIndex={0}
// //             className="
// //                dropdown-content
// //                menu
// //                bg-base-100
// //                text-base-content
// //                rounded-box
// //                shadow-2xl
// //                w-56
// //                max-h-96
// //                overflow-y-auto
// //                p-2
// //                mt-2
// //             "
// //          >

// //             {themes.map((theme) => (

// //                <li key={theme}>

// //                   <button
// //                      onClick={() => changeTheme(theme)}
// //                      className={
// //                         currentTheme === theme
// //                            ? "active"
// //                            : ""
// //                      }
// //                   >
// //                      {theme}
// //                   </button>

// //                </li>

// //             ))}

// //          </ul>

// //       </div>

// //    );

// // }

// // export default ThemeSelector;

// import { useEffect, useState } from "react";

// function ThemeSelector() {

//    const themes = [
//       "light",
//       "dark",
//       "cupcake",
//       "bumblebee",
//       "emerald",
//       "corporate",
//       "synthwave",
//       "retro",
//       "cyberpunk",
//       "valentine",
//       "halloween",
//       "garden",
//       "forest",
//       "aqua",
//       "lofi",
//       "pastel",
//       "fantasy",
//       "black",
//       "luxury",
//       "dracula",
//       "autumn",
//       "business",
//       "lemonade",
//       "night",
//       "coffee",
//       "winter",
//       "dim",
//       "nord",
//       "sunset",
//    ];

//    const [currentTheme, setCurrentTheme] = useState("light");

//    useEffect(() => {

//       const savedTheme =
//          localStorage.getItem("learnify-theme") || "light";

//       document.documentElement.setAttribute(
//          "data-theme",
//          savedTheme
//       );

//       setCurrentTheme(savedTheme);

//    }, []);

//    const changeTheme = (theme) => {

//       document.documentElement.setAttribute(
//          "data-theme",
//          theme
//       );

//       localStorage.setItem(
//          "learnify-theme",
//          theme
//       );

//       setCurrentTheme(theme);

//    };

//    return (

//       <div className="dropdown dropdown-end fixed top-5 right-5 z-50">

//          <button
//             tabIndex={0}
//             className="btn btn-primary shadow-xl gap-2"
//          >

//             🎨

//             <span className="hidden sm:inline">
//                Theme
//             </span>

//          </button>

//          <ul
//             tabIndex={0}
//             className="
//                dropdown-content
//                menu
//                bg-base-100
//                text-base-content
//                rounded-box
//                shadow-2xl
//                border
//                border-base-300
//                w-56
//                max-h-96
//                overflow-y-auto
//                p-2
//                mt-2
//             "
//          >

//             <li className="menu-title">

//                <span>
//                   Select Theme
//                </span>

//             </li>

//             {themes.map((theme) => (

//                <li key={theme}>

//                   <button
//                      onClick={() => changeTheme(theme)}
//                      className={
//                         currentTheme === theme
//                            ? "active font-semibold"
//                            : ""
//                      }
//                   >

//                      {theme}

//                      {currentTheme === theme && (

//                         <span className="ml-auto">
//                            ✓
//                         </span>

//                      )}

//                   </button>

//                </li>

//             ))}

//          </ul>

//       </div>

//    );

// }

// export default ThemeSelector;