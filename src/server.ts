import express from "express";
import alunosRouter from "./routes/alunos";
import livrosRouter from "./routes/livros";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/alunos", alunosRouter);
app.use("/livros", livrosRouter);

app.listen(PORT, () => {
  console.log(`Servidor executando em localhost: ${PORT}`);
});
