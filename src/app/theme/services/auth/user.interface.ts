export interface User {
    email: string;
    passwords:{
        password:string,
        repeatPassword:string
    };
    confirmPassword?: string;
    selectLocation:string;
    selectOption:string;
}