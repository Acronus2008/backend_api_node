import { User, Prisma } from '@prisma/client';
import { UserService } from '../services/UserService';

export class UserFacade {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(): Promise<{
    success: boolean;
    data?: User[];
    error?: string;
  }> {
    try {
      const users = await this.userService.getAllUsers();
      return { success: true, data: users };
    } catch (error) {
      return { success: false, error: 'Failed to fetch users' };
    }
  }

  async getUserById(id: number): Promise<{
    success: boolean;
    data?: User;
    error?: string;
  }> {
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: 'Failed to fetch user' };
    }
  }

  async searchUsers(query: string): Promise<{
    success: boolean;
    data?: User[];
    error?: string;
  }> {
    try {
      const users = await this.userService.searchUsers(query);
      return { success: true, data: users };
    } catch (error) {
      return { success: false, error: 'Failed to search users' };
    }
  }

  async createUser(userData: Prisma.UserCreateInput): Promise<{
    success: boolean;
    data?: User;
    error?: string;
  }> {
    try {
      const user = await this.userService.createUser(userData);
      return { success: true, data: user };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create user'
      };
    }
  }

  async updateUser(id: number, userData: Prisma.UserUpdateInput): Promise<{
    success: boolean;
    data?: User;
    error?: string;
  }> {
    try {
      const user = await this.userService.updateUser(id, userData);
      return { success: true, data: user };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update user'
      };
    }
  }

  async patchUser(id: number, userData: Prisma.UserUpdateInput): Promise<{
    success: boolean;
    data?: User;
    error?: string;
  }> {
    try {
      const user = await this.userService.patchUser(id, userData);
      return { success: true, data: user };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to patch user'
      };
    }
  }

  async deleteUser(id: number): Promise<{
    success: boolean;
    data?: User;
    error?: string;
  }> {
    try {
      const user = await this.userService.deleteUser(id);
      return { success: true, data: user };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete user'
      };
    }
  }
}