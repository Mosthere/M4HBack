import axios from "axios";
import { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await axios.get(`${API_URL}/products/get`);
    return res.data;
  } catch (err) {
    console.error("Error al obtener productos", err);
    return [];
  }
}

export async function getProductById(id:string) {
    try {
        const res = await axios.get(`${API_URL}/products/${id}`)
        return res.data
    } catch (err){
        console.error("Error al obtener producto", err)
        return []
    }
}