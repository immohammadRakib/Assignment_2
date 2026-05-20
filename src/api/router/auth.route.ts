import { Router } from "express";
import { sign } from "node:crypto";
import { signUp } from "../controllers/auth.controller";



const router = Router()


router.post('/login', () => {})
router.post('/signup', signUp)
router.get('/me', () => {})

router.put('/update/:id', () => {})
router.delete('/delete/:id', () => {})


export default router;