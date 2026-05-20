import type { Request, Response } from "express"
import authService from "../service/auth.service"
import { sendResponse } from "../../utils/sendResponse";


export const signUp = async (req: Request, res: Response) => {
    // const {name, email, age, role} = req.body
    console.log(req.body)

    const user = await authService.createUser(req.body);
    if(!user){
        return sendResponse(res, {message: "Sorry"}, 400)
    }
    sendResponse(res, {message: "user created", data: user}, 200)


}