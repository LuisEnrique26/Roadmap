import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../core/config/database.js";
class AuthController {
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;
            if (!userId) {
                res.status(400).json({ error: "User ID is required" });
                return;
            }
            const result = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            if (!result) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            const user = {
                id: result.id,
                name: result.name,
                role: result.role
            };
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            const secret = process.env.JWT_SECRET || "default_secret";
            const token = jwt.sign(
                { id: user.id, role: user.role },
                secret,
                { expiresIn: "4h" }
            );
            res.status(200).json({
                success: true,
                message: `Welcome ${user.name}`,
                token: token
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default AuthController;