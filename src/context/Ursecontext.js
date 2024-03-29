import { createContext , useEffect, useState} from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

export const UserContext = createContext({});
export function UserContextProvider({children}) {
    const [user, setUser] = useState(false);
    const [ready, setReady] = useState(false);
    const [places, setPlaces] =useState([]);
    //console.log(user);
    useEffect(()=>{
        if(!user){
          try{
             axios.get('/profile',).then(response=>{
               setUser(response.data);
               setReady(true);
             }).catch(e=>{
              console.log(e);
             })
            //console.log(response);
            
          }catch(err){
              redirect('/');
            console.log(err);
          }
        }
    },[user])
    
    return (
        <UserContext.Provider value={{user,setUser,ready,places,setPlaces}}>
            {children}
        </UserContext.Provider>
    );
}