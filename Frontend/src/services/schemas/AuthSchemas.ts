export type LoginSchema = {
    username:string;
    password:string;
    rememberMe:boolean
}

export type LoginResponse = {
    data:{
    user:{
        id:string; 
        username:string;
        email:string;},
    message:string;}
}