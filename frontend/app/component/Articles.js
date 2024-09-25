/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import axios from "axios"
import {useState , useEffect } from "react";
import Link from "next/link";
import io from 'socket.io-client';
import { useDark } from "../context/darkMode";

const socket = io('http://localhost:5000');

export default function Articles(){
    const {isDark,setIsDark} = useDark()

    const [search , setSearch] =useState('')
    const [articles,setArticles] = useState([]);
    const [newArticles, setNewArticles] = useState([]);

    useEffect(()=>{
        const fetch =async()=>{
            try{
                const res= await axios(`http://localhost:5000/api/articles/?keyword=${search}`)
                setArticles(res.data)
            }catch(error){
                console.error(error)
            }
        }
        fetch()

        // Écouter les notifications de nouveaux articles
        socket.on('new-articles', newArticles => {
            setNewArticles(newArticles);
        });
          
        return () => {
            socket.off('new-articles');
        };
         
    },[search])



    const handleCheck = async(id)=>{
        try{
            await axios.put(`http://localhost:5000/api/articles/read/${id}`)
            setArticles(articles.map(article => article._id === id ? { ...article, isRead: true } : article))
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className={`${isDark ? 'bg-gray-800':''} py-8`}>
            <div className="container mx-auto px-4">
                <input className={`${isDark ? 'bg-blue-500 ' : 'bg-white'} mb-2 border rounded-md p-2`} value={search} placeholder="search..." onChange={(e)=>{
                    setSearch(e.target.value)
                }}/>
                
                {newArticles.length > 0 &&
                (
                    <div>
                    <h1 className="mt-6 mb-2 text-red-500 text-xl font-semibold">New articles</h1>
                    {newArticles.map((article)=>{
                        return(
                            <div key={article._id} className={`${isDark ? 'bg-gradient-to-r from-violet-800 to-blue-800':''} shadow-md py-6 px-4 my-6`}>
                                <Link href={article.link} target="_blank">
                                    <h1 className= {`${isDark ? 'text-white' :'' } font-semibold mb-4 hover:text-gray-600`}>{article.title}</h1>
                                </Link>
                                
                                <div className="flex space-x-3 mb-2">
                                    <label className={`${isDark ? 'text-white' :'' }`}>mark the article as read</label>
                                    <input type="checkbox" checked={article.isRead} onChange={()=>{
                                        handleCheck(article._id)
                                    }
                                    }/>
                                </div>
                                
                                <p className="text-gray-500 text-sm">{article.pubDate}</p>
                            </div>
                        )
                    })}
                </div>
                )  
                
                }
                
                <h1 className="mt-6 mb-2 text-blue-500 text-xl font-semibold">List of articles</h1>
                <div>
                    {articles.map((article)=>{
                        return(
                            <div key={article._id} className={`${isDark ? 'bg-gradient-to-r from-violet-800 to-blue-800':''} shadow-md py-6 px-4 my-6`}>
                                <Link href={article.link} target="_blank">
                                    <h1 className= {`${isDark ? 'text-white' :'' } font-semibold mb-4 hover:text-gray-600`}>{article.title}</h1>
                                </Link>
                                
                                <div className="flex space-x-3 mb-2">
                                    <label className={`${isDark ? 'text-white' :'' }`}>mark the article as read</label>
                                    <input type="checkbox" checked={article.isRead} onChange={()=>{
                                        handleCheck(article._id)
                                    }
                                    }/>
                                </div>
                                
                                <p className="text-gray-500 text-sm">{article.pubDate}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}