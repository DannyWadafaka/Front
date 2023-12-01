import DefaultLayout from "../Layout/DefaultLayout.tsx";
import './Login.css'
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider.tsx";





export default function Login(){
  
const [username, setUsername]= useState("");
const [password, setPassword]= useState("");
const auth = useAuth();
if(auth.isAuthenticated){
    
    return <Navigate to ="/select"/>
    

}


    return(
       
        <DefaultLayout>
        <section>
            <h1 class="Titulo">
            <br/> Bienvenido/a de nuevo <br/> <br/>
                Ingresa tu usuario
            </h1>
            <form 
            className="Formulario"
            >
                <label>User</label>
                <input 
                type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              
                <button >Iniciar sesión</button>

            </form>
           
        </section>

        </DefaultLayout>

    );


}
