export type ActiveSessionType =
  | "about"
  | "projects"
  | "skills"
  | "education"
  | "experience"
  | "contact"
  | null;

export interface MenuOption {
  label: string;
  id: Exclude<ActiveSessionType, null>;
}
