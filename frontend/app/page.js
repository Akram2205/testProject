'use client'
import Image from "next/image";
import Nav from "./component/nav";
import Articles from "./component/Articles";
import { useState , useEffect} from "react";
import DarkProvider from "./context/darkMode";


export default function Home() {
  const [isDark,setIsDark] = useState(false)
  return (
    <DarkProvider>
      <div>
        <div>
          <Nav/>
          <Articles/>
        </div>
      </div> 
    </DarkProvider>

  );
}
