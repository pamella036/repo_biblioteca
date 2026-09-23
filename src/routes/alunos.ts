import { Router, Request, Response } from "express";
import { prisma } from "../prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const alunos = await prisma.alunos.findMany();
    res.json(alunos);
});

export default router; 