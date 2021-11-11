import { Router } from "express";
import { getUsuarios, getUsuario, postUsuario, putUsuario, deletUsuario } from "../controllers/usuario";


const router = Router(); 

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deletUsuario);




export default router;