import { Router } from "express";

const router = Router();

//Esto por ahora es dummy esto evidenetemente se va a cambiar
router.get("/", (req, res) => {
    res.send("Hello World");
});

export default router;