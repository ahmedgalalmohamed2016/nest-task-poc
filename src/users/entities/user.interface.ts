export interface User {
    id?: number;
    email?: string;
    role?: UserRole;
}

export enum UserRole {
    GLOBALMANAGER = 'globalManager',
    MANAGER = 'manager',    
    REGULAR = 'regular',
}