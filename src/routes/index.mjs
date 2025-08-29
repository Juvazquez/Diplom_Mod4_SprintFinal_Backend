import express from "express";
import paisRouter from "./paisRouter.mjs";
import authRouter from "./authRouter.mjs";

const router = express.Router();

router.use("/paises", paisRouter);
router.use("/auth", authRouter);

export default router;
