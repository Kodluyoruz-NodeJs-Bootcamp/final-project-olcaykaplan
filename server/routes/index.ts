import express from "express";
import movieApi from "./movie.routes";
import authApi from "./auth.routes";

const router = express.Router();

router.use(movieApi)
router.use(authApi)


export = router;