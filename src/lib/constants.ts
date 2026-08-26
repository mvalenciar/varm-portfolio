import {
  ActiveSessionType,
  MenuOption,
} from "@/interfaces/navigation.interface";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/ContactSection";

// 🟢 Configuración de sesiones a cargar en el portafolio
export const CONFIG_SESIONES: Record<
  Exclude<ActiveSessionType, null>,
  { title: string; component: React.ComponentType }
> = {
  about: {
    title: "Quién Soy // 自己紹介",
    component: AboutSection,
  },
  projects: {
    title: "Proyectos // 実績",
    component: ProjectsSection,
  },
  skills: {
    title: "Skills // 技術",
    component: SkillsSection,
  },
  education: {
    title: "Educación // 修行",
    component: EducationSection,
  },
  contact: {
    title: "Contacto // 連絡先",
    component: ContactSection,
  },
};

// 🟢 Opciones para el menu de navegación portafolio
export const MENU_OPTIONS: MenuOption[] = [
  { label: "Quién soy", id: "about" },
  { label: "Proyectos", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Educación", id: "education" },
  { label: "Contacto", id: "contact" },
];

// 🟢 Canales de comunicación oficiales para el mercado nacional e internacional

export const CHANNELS_CONTACT = [
  {
    socialNetwork: "✉️ Correo Electrónico",
    data: "miltonalonsovalenciarincon@gmail.com",
    action: "mailto:miltonalonsovalenciarincon@gmail.com",
    labelButton: "Env. Mensaje",
  },
  {
    socialNetwork: "💼 LinkedIn Profesional",
    data: "Milton Alonso Valencia Rincón",
    action:
      "https://www.linkedin.com/in/milton-alonso-valencia-rincon-78054a242",
    labelButton: "Ver Perfil",
  },
  {
    socialNetwork: "⚔️ Repositorio GitHub",
    data: "Código Fuente & Arquitecturas",
    action: "https://github.com", // Más adelante pones tu enlace real
    labelButton: "Explorar Código",
  },
];
