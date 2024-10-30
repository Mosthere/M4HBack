import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository{
    private users = {
    data: [
        {
            id: 1,
            email: "usuario1@example.com",
            name: "Usuario Uno",
            password: "contraseña123",
            address: "Calle Falsa 123",
            phone: "123-456-7890",
            country: "España",
            city: "Madrid"
        },
        {
            id: 2,
            email: "usuario2@example.com",
            name: "Usuario Dos",
            password: "contraseña456",
            address: "Avenida Siempre Viva 456",
            phone: "098-765-4321",
            country: "México",
            city: "Ciudad de México"
        },
        {
            id: 3,
            email: "usuario3@example.com",
            name: "Usuario Tres",
            password: "contraseña789",
            address: "Boulevard de los Sueños Rotos 789",
            phone: "555-555-5555"
        },
        {
            id: 4,
            email: "usuario4@example.com",
            name: "Usuario Cuatro",
            password: "contraseña000",
            address: "Plaza Mayor 101",
            phone: "777-888-9999",
            country: "Argentina"
        }
    ],
    }
    getUsers(){
        return this.users;
    }
}