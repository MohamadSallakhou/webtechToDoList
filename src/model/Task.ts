export interface Task {
    readonly id: number;    // Eindeutige ID für die Aufgabe
    name: string;           // Name der Aufgabe
    completed?: boolean;    // Optional: Status der Aufgabe
}
