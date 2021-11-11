import express  from "express";
import userRouter from "../routes/usuario";
import cors from 'cors'; 
import db from "../db/connection";


 class Server {
    
    private app: express.Application;
    private port:string;
    private apiPaths ={
        usuarios:'/api/usuarios'
    };
    
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT ||'8000';
        //db
        this.dbConnection();
        //middlewares metodos iniciales
        this.middlewares();
        //Definir mis rutas
        this.routes();
    }

    middlewares(){
        //CORS 
        this.app.use( cors());
        //LECTURA DEL BODY 
        this.app.use(express.json());
        //CARPETA PUBLICA
        this.app.use(express.static('public'));
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('DataBase Online =)');
        } catch (error:any ) {
            throw new Error( error );
        }
    }
    
    routes()
    {
        this.app.use(this.apiPaths.usuarios, userRouter);
    }

    listen()
    {
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en Puerto '+this.port);
        });
    }
}

export default Server;