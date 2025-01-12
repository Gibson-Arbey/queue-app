
export interface Ticket {
    id: string;
    number: number;
    createdAt: Date;
    handleAtDesk?: string; // Modulo 1, 
    handleAt?: Date;
    done: boolean;
  }