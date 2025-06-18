import { User, Prisma } from '@prisma/client';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.userRepository.search(query);
  }

  async createUser(userData: Prisma.UserCreateInput): Promise<User> {
    // Add any business logic validation here
    if (!userData.email) {
      throw new Error('Email is required');
    }
    if (!userData.email.includes('@')) {
      throw new Error('Invalid email format');
    }

    return this.userRepository.create(userData);
  }

  async updateUser(id: number, userData: Prisma.UserUpdateInput): Promise<User> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    if (userData.email && typeof userData.email === 'string' && !userData.email.includes('@')) {
      throw new Error('Invalid email format');
    }

    return this.userRepository.update(id, userData);
  }

  async patchUser(id: number, userData: Prisma.UserUpdateInput): Promise<User> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    if (userData.email && typeof userData.email === 'string' && !userData.email.includes('@')) {
      throw new Error('Invalid email format');
    }

    return this.userRepository.patch(id, userData);
  }

  async deleteUser(id: number): Promise<User> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    return this.userRepository.delete(id);
  }
}