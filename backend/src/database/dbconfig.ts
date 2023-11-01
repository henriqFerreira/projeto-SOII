import { Sequelize } from 'sequelize-typescript';
import Aluno from "../models/Aluno";

const connection: Sequelize = new Sequelize(
	"facul_db",
	"root",
	"root123@!",
	{
		dialect: "mariadb",
		host: "192.168.78.22",
		port: 3306,
		logging: true,
		models: [ Aluno ]
	}
);

export default connection;
