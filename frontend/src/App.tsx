import React from 'react';
import './App.module.css';
import { useEffect, useState, useRef } from "react";

type Aluno = {
	id: number;
	nome: string;
	nota: number;
}

function App() {
	const BASE_URL: string = "http://localhost:5000";
	
	const [alunos, setAlunos] = useState<Aluno[]>([]);
	const [rerender, setRerender] = useState<boolean>(false);
	
	const nomeRef = useRef<HTMLInputElement>(null);
	const notaRef = useRef<HTMLInputElement>(null);

	const saveAluno = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const result = await fetch(`${BASE_URL}/user/create`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				nome: String(nomeRef.current!.value),
				nota: Number(notaRef.current!.value)
			})
		}).then(response => response.json());

		setRerender(prev => (!prev));
	}

	const deleteAluno = async (e: React.MouseEvent<HTMLButtonElement> , id: number) => {
		const result = await fetch(`${BASE_URL}/user/${id}`, { method: 'DELETE' }).then(response => response.json());
		setRerender(prev => (!prev));
	}

	const updateAluno = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		const newNota = Number(window.prompt('Qual a nota do aluno?'));

		const result = await fetch(`${BASE_URL}/user/update/${id}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				nota: newNota
			})
		}).then(response => response.json());

		setRerender(prev => (!prev));
	}

	useEffect(() => {
		const findAllAlunos = async () => {
			const result: { Ok: boolean, data: Aluno[] } = await fetch(`${BASE_URL}/user/all`, { method: 'GET' }).then(response => response.json());
			setAlunos(result.data);
		}
		
		findAllAlunos();
	}, [rerender])

	return (
		<main>
			<h3>Adicionar aluno</h3>
			<form>
				<input ref={nomeRef} type="text" placeholder="Nome" />
				<input ref={notaRef} type="number" placeholder="Nota" />
				<button onClick={(e) => saveAluno(e)}>Adicionar</button>
			</form>
			<h3>Listagem de alunos</h3>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Nome</th>
						<th>Nota</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{(alunos.length > 0) && alunos.map((i, k) => (
						<tr key={k}>
							<td>{i.id}</td>
							<td>{i.nome}</td>
							<td>{i.nota}</td>
							<td>
								<button onClick={(e) => deleteAluno(e, i.id)}>Excluir</button>
								<button onClick={(e) => updateAluno(e, i.id)}>Atualizar</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}

export default App;                 
