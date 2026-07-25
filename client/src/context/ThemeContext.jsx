import { createContext, useEffect, useState } from "react";

export const ThemeContext =
   createContext();

export const ThemeProvider = ({
   children,
}) => {

   const [theme,
      setTheme] = useState(
         "light"
      );

   useEffect(() => {

      const savedTheme =
         localStorage.getItem(
            "theme"
         );

      if (savedTheme) {
         setTheme(savedTheme);
      }

   }, []);

   useEffect(() => {

      document.body.className = "";

      document.body.classList.add(
         theme
      );

      localStorage.setItem(
         "theme",
         theme
      );

   }, [theme]);

   return (
      <ThemeContext.Provider
         value={{
            theme,
            setTheme,
         }}
      >
         {children}
      </ThemeContext.Provider>
   );
};