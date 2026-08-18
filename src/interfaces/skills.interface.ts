// 📜 Las únicas llaves permitidas para los cajones de habilidades
export type SkillTypeCategory = "front" | "back" | "qa";

// El contrato que obliga al objeto a tener exactamente esas categorías y un arreglo de textos
export interface InventorySkills {
  front: string[];
  back: string[];
  qa: string[];
}

// Estructura para los botones horizontales (Tabs)
export interface SkillTabOption {
  id: SkillTypeCategory;
  label: string;
}
