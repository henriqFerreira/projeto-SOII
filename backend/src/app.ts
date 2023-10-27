import express, { Express } from "express";
import cors from "cors";
import router from "./routes/user.routes";
import connection from "./database/dbconfig";
import { json, urlencoded } from "body-parser";

export const app: Express = express();

app.use(cors({
	origin: '*'
}));

app.use(json());

app.use(urlencoded({
	extended: true
}));

app.use('/', router);

connection.sync({ alter: true }).then(() => {
	console.log('database connected');
}).catch((error: any) => {
	console.log('erro: ', error);
});
