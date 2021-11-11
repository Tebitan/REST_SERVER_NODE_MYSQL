import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async(req: Request , res:Response) =>{
    try {
        const usuarios = await Usuario.findAll();
        res.json({usuarios});   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Hable con el Administrador`
        });
    }
}

export const getUsuario = async(req: Request , res:Response) =>{
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if(usuario)
        {
            res.json(usuario);
        }else
        {
            res.status(404).json({
                msg:`No existe un Usuario con el id: ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Hable con el Administrador`
        });
    }
}

export const postUsuario =async(req: Request , res:Response) =>{
    const { body } = req;
   try 
   {
        const existeEmail = await Usuario.findOne({
            where:{
                email:body.email
            }
        });

        if(existeEmail)
        {
           return res.status(400).json({
                msg:`Ya existe un Usuario con Email: ${body.email}`
            });
        }
        const usuario = Usuario.build(body);  
        await usuario.save();
        res.json(usuario)
   } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Hable con el Administrador`
        });
   }
}


export const putUsuario = async(req: Request , res:Response) =>{
    const { body } = req;
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario)
        {
            return res.status(404).json({
                msg:`No existe un Usuario con el id: ${id}`
            });
        }
        await usuario.update( body);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Hable con el Administrador`
        });
    }
}

export const deletUsuario = async(req: Request , res:Response) =>{
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario)
        {
            return res.status(404).json({
                msg:`No existe un Usuario con el id: ${id}`
            });
        }
        //await usuario.destroy(); eliminacion fisica 
        await usuario.update( {
            state:false
        });
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:`Hable con el Administrador`
        });
    }
}

