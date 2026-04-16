import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext({ dark: true, toggleTheme: () => {} });

export function ThemeProvider({ children }) {
    useEffect(() => {
        document.body.classList.add("dark-mode");
    }, []);

    return (
        <ThemeContext.Provider value={{ dark: true, toggleTheme: () => {} }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
