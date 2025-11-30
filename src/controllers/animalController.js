import { AnimalModel } from "../models/animalModel.js";

export const AnimalController = {
  // 1. Controller untuk mengambil semua data hewan
  async getAnimals(req, res) {
    try {
      const data = await AnimalModel.getAllAnimals();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 2. Controller untuk mengambil detail satu hewan berdasarkan ID
  async getAnimalDetail(req, res) {
    try {
      const { id } = req.params;
      const data = await AnimalModel.getAnimalById(id);
      res.json(data);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  // 3. Controller untuk mengambil data shelter
  async getShelters(req, res) {
    try {
      const data = await AnimalModel.getShelters();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 4. Controller untuk mengambil daftar tips
  async getTips(req, res) {
    try {
      const data = await AnimalModel.getTips();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 5. BARU: Controller untuk mengambil detail tips berdasarkan ID
  // (Fungsi ini yang menghubungkan route /tips/:id dengan model)
  async getTipDetail(req, res) {
    try {
      const { id } = req.params;
      const data = await AnimalModel.getTipById(id);
      
      if (!data) {
        return res.status(404).json({ error: "Tips tidak ditemukan" });
      }

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};