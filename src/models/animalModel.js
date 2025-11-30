import { supabase } from "../config/supabaseClient.js";

export const AnimalModel = {
  // 1. Ambil semua hewan (untuk halaman Home)
  async getAllAnimals() {
    const { data, error } = await supabase.from("animals").select("*");
    if (error) throw error;
    return data;
  },
  
  // 2. Ambil detail hewan by ID (untuk halaman Detail Hewan)
  async getAnimalById(id) {
    const { data, error } = await supabase
      .from("animals")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  // 3. Ambil data shelter (untuk halaman Adopsi)
  async getShelters() {
    const { data, error } = await supabase.from("shelters").select("*");
    if (error) throw error;
    return data;
  },

  // 4. Ambil semua tips (untuk halaman List Tips)
  async getTips() {
    const { data, error } = await supabase.from("tips").select("*");
    if (error) throw error;
    return data;
  },

  // 5. BARU: Ambil detail tips by ID (agar tips bisa diklik)
  async getTipById(id) {
    const { data, error } = await supabase
      .from("tips")
      .select("*")
      .eq("id", id)
      .single(); // .single() memastikan hanya 1 data yang diambil
    if (error) throw error;
    return data;
  }
};