export type ActiveSessionType =
  | "about"
  | "projects"
  | "skills"
  | "education"
  | "contact"
  | null;

export interface MenuOption {
  label: string;
  id: Exclude<ActiveSessionType, null>;
}
