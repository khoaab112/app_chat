// src/services/userService.js
const authRepository = require('../Repository/authRepository');

class UserService {
    async getAllUsers() {
        return await authRepository.getAllUsers();
    }

    async getUserById(id) {
        const user = await authRepository.getUserById(id);
        if (!user) throw new Error('User not found');
        return user;
    }

    async createUser(name, email) {
        return await authRepository.createUser(name, email);
    }
}

module.exports = new UserService();