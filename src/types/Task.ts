export interface Task {
  id: number;
  title?: string; // Optional, falls vorhanden
  description?: string; // Optional, falls vorhanden
  completed: boolean;
  name?: string; // Optional, falls es ein Feld 'name' in deinem Backend gibt
}
