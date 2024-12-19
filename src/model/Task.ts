export interface Task {
    readonly id: number;
    //name: string;           // Nicht optional
    description: string;    // Beschreibung der Aufgabe
    completed: boolean;     // Status der Aufgabe
    //dueDate?: string;       // Optional
}
