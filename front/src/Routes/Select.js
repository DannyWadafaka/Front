import './Select.css'




export default function Select(){
    return(
        <body className="bodyselect">
        <div>
        <h1>Bienvenido</h1>
   
        <button className="iniciardoc" onClick={() => window.location.href = '/home'}>Iniciar nuevo documento</button>
        <button className="balance" onClick={() => window.location.href = '/registroventas'}>Abrir Balance</button>
        <button className="masopciones" onClick={() => window.location.href = '/inventario'}>Ver inventario</button>
        
        
        </div>
        </body>

    )

}