import express from "express";
import movieApi from "./movie.routes";
import actorApi from "./actor.routes";
import authApi from "./auth.routes";

const router = express.Router();

router.use(movieApi)
router.use(actorApi)
router.use("/auth",authApi)


export = router;