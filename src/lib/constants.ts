import {
  ActiveSessionType,
  MenuOption,
} from "@/interfaces/navigation.interface";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";

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
  experience: {
    title: "Experiencia // 経験",
    component: ExperienceSection,
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
  { label: "Experiencia", id: "experience" },
  { label: "Contacto", id: "contact" },
];
