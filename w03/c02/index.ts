import express, { type Request, type Response } from 'express';
import MovementRepository from './MovementRepository.js';
import MovementService from './MovementService.js';
import MovementController from './MovementController.js';

const app = express();

app.use(express.json());

const repository = new MovementRepository();
const service = new MovementService(repository);
const controller = new MovementController(service);

app.post("/api/v1/movimientos", (req: Request, res: Response) => controller.handleCreate(req, res));
app.get("/api/v1/movimientos", (req: Request, res: Response) => controller.handleGetPaginated(req, res));

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

export { app };