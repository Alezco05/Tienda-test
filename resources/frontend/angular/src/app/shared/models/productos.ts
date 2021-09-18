import { Marca } from "./marca";

export interface Producto {
  id?: number;
  nombreProducto?: string;
  marca?: Marca;
  talla?: string;
  observaciones?: string;
  cantidad?: string;
  fechaEmbarque?: string;
}
