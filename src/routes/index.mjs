import express from "express";
import paisRouter from "./paisRouter.mjs";
import authRouter from "./authRouter.mjs";
import profileRouter from "./profileRouter.mjs";
const router = express.Router();

router.use("/paises", paisRouter);
router.use("/auth", authRouter);
router.use("/profiles", profileRouter);

export default router;
