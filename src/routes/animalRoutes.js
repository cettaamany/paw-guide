import express from "express";
import { AnimalController } from "../controllers/animalController.js";

const router = express.Router();

// Route untuk Hewan
router.get("/animals", AnimalController.getAnimals);
router.get("/animals/:id", AnimalController.getAnimalDetail);

// Route untuk Shelter
router.get("/shelters", AnimalController.getShelters);

// Route untuk Tips
router.get("/tips", AnimalController.getTips);
router.get("/tips/:id", AnimalController.getTipDetail); // <-- Route BARU untuk detail tips

export default router;