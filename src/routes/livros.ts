import { Router, Request, Response } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET /livros - lista todos os livros
router.get("/", async (req: Request, res: Response) => {
    const livros = await prisma.livros.findMany();
    res.json(livros);
});

// GET /livros/:id - busca um livro pelo id
router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const livro = await prisma.livros.findUnique({ where: { id } });

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    res.json(livro);
});

// POST /livros - cria um novo livro
router.post("/", async (req: Request, res: Response) => {
    const { titulo, autor, isbn, anoPublicacao } = req.body;

    const livro = await prisma.livros.create({
        data: { titulo, autor, isbn, anoPublicacao },
    });

    res.status(201).json(livro);
});

// PUT /livros/:id - atualiza um livro existente
router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { titulo, autor, isbn, anoPublicacao } = req.body;

    try {
        const livro = await prisma.livros.update({
            where: { id },
            data: { titulo, autor, isbn, anoPublicacao },
        });

        res.json(livro);
    } catch (error) {
        res.status(404).json({ erro: "Livro não encontrado" });
    }
});

// DELETE /livros/:id - remove um livro
router.delete("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        await prisma.livros.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ erro: "Livro não encontrado" });
    }
});

export default router;
