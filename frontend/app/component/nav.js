import { CiDark } from "react-icons/ci";
import { useDark } from "../context/darkMode";
export default function Nav(){
    const {isDark,setIsDark} = useDark()
    return(
        <div className={`${isDark ?'bg-gray-800': 'bg-white'}`}>
            <div className={` container mx-auto px-4`}>
                <div className="flex justify-between items-center py-3">
                    <h1 className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>Google News</h1>
                    <div className="space-x-4 flex items-center">
                        <CiDark className={`${isDark ? 'text-white':''} text-3xl cursor-pointer`} onClick={()=>{
                            setIsDark(!isDark)
                        }}/>
                        <button className="py-1 px-2 rounded-md border border-blue-500 text-blue-500">Sign in</button>
                        <button className="py-1 px-2 rounded-md bg-blue-500 text-white">Sign up</button>
                    </div>
                </div>
            </div>
            <div className={`${isDark ? 'from-violet-800 to-blue-800' :'from-violet-400 to-blue-400'} flex justify-center items-center py-1 space-x-10 bg-gradient-to-r`}>
                <p>sign up to take the full advantage</p>
                <button className={`${isDark ? 'bg-gray-800 text-white' :'bg-white text-gray-800'} py-[2px] px-2 border rounded-md`}>Sing up</button>
            </div>
        </div>
        
    )
}