import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller";



const router = Router()

router.post('/login', login)
router.post('/signup', signUp)
router.get('/me', () => {})

router.put('/update/:id', () => {})
router.delete('/delete/:id', () => {})


export default router;