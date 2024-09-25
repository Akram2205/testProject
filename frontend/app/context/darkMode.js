'use client'

const { useState, createContext, useContext } = require("react")

const darkContext = createContext()

export default function DarkProvider({children}){
    const [isDark,setIsDark] = useState(false)
    return(
        <darkContext.Provider value={{isDark,setIsDark}}>
            {children}
        </darkContext.Provider>
    )
}

export const useDark = ()=>{
    return(
        useContext(darkContext)
    )
}