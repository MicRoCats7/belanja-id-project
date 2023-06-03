// import React, { createContext, useState } from 'react';

// export const SessionContext = createContext();

// export const SessionProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     // Perform login logic
//     setUser(userData);
//   };

//   const logout = () => {
//     // Perform logout logic
//     setUser(null);
//   };

//   return (
//     <SessionContext.Provider value={{ user, login, logout }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };