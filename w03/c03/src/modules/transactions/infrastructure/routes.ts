import { Router } from "express";
import authGuard from "../../../core/middlewares/authGuard.js";
import TransactionController from "./TransactionController.js";
import TransactionRepository from "./TransactionRepository.js";
import TransactionService from "../application/TransactionService.js";
import rateLimiter from "../../../core/middlewares/rateLimiter.js";
import errorHandler from "../../../core/middlewares/errorHandler.js";
import AuthController from "../../auth/AuthController.js";
import ReportController from "../../reports/ReportController.js";

const router = Router();

const authMiddleware = authGuard;
const rateLimiterMiddleware = rateLimiter;
const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);
const authController = new AuthController();
const reportController = new ReportController();

router.post("/auth/login", (req, res) => {
    authController.login(req, res);
});

router.use((req, res, next) => {
    authMiddleware(req, res, next);
});

router.use((req, res, next) => {
    rateLimiterMiddleware(req, res, next);
});

router.get("/transactions", (req, res) => {
    transactionController.handleGetAll(req, res);
});
router.get("/transactions/:id", (req, res) => {
    transactionController.handleGetById(req, res);
});
router.get("/transactions/paginated", (req, res) => {
    transactionController.handleGetPaginated(req, res);
});
router.post("/transactions", (req, res) => {
    transactionController.handleCreate(req, res);
});

router.post("/reports", (req, res) => {
    reportController.handleCreate(req, res);
});

router.use(errorHandler);

export default router;