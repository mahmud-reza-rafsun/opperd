import { Router } from "express";
import { cartController } from "./cart.controller";

const router = Router();

router.post("/", cartController.addToCart);
router.get("/", cartController.getCart);
router.delete("/clear", cartController.clearCart);
router.delete("/:id", cartController.removeFromCart);

export const cartRoutes = router;
