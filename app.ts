import dotenv from 'dotenv';
import Server from './models/server';

//configuracion
dotenv.config();

const server = new Server();

server.listen(); 