import { createContext, useState } from "react";

export const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {
        
    }
})
export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState("dark")
    const toggleTheme = () => {
        setTheme((pre) => {
            return (pre==='light'? 'dark' : 'light')
        })
    }
    return (<>
        <ThemeContext.Provider value={{theme,toggleTheme:toggleTheme}}>
            {children}
    </ThemeContext.Provider>
    </>)
}  