import { Router, Request, Response, NextFunction } from "express";
import Aluno from "../models/Aluno";

const router: Router = Router();

router.get("/user/all", async (request: Request, response: Response, next: NextFunction): Promise<void> => {
	console.log('Buscando todos usuários...');

	const alunos: Aluno[] = await Aluno.findAll();

	response.status(200).json({
		Ok: true,
		data: [ ...alunos ]
	});
});

router.get("/user/:id", async (request: Request, response: Response, next: NextFunction): Promise<void> => {
	const { id } = request.params;

	console.log(`Buscando usuario por id: ${id}`);

	const aluno: Aluno | null = await Aluno.findOne({ where: { id: id }});

	if (!aluno) {
		response.status(404).json({
			Ok: false,
			data: "Aluno não encontrado"
		});
	return;
	}

	response.status(200).json({
		Ok: true,
		data: aluno
	});
});


router.delete("/user/:id", async (request: Request, response: Response, next: NextFunction) => {
	const { id } = request.params;

	console.log('Deletando usuario por id: ${id}');

	const deleted = await Aluno.destroy({ where: { id: id }});

	response.status(200).json({
		Ok: true,
		data: deleted
	});
});

router.post("/user/create", async (request: Request, response: Response, next: NextFunction) => {
	const { nome, nota } = request.body;

	console.log('Criando usuario');

	const aluno: Aluno = await Aluno.create({ nome: nome, nota: nota });

	response.status(200).json({
		Ok: true,
		data: aluno
	});
});

router.patch("/user/update/:id", async (request: Request, response: Response, next: NextFunction) => {
	const { id } = request.params;
	const { nota } = request.body;
	console.log(`Atualizando usuario com id: ${id}`)

	const aluno: Aluno | null = await Aluno.findOne({ where: { id: id }});

	if (!aluno) {
		response.status(404).json({
			Ok: false,
			data: 'Usuario nao encontrado'
		});
		return;
	}

	aluno.nota = nota;

	await aluno.save();

	response.status(200).json({
		Ok: true,
		data: aluno
	});
});

export default router;

