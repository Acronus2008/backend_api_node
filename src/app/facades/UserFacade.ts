import { Facade, InjectService } from '../decorators';
import { UserService } from '../services/UserService';
import { User, UserCreateInput, UserUpdateInput } from '../types/user.types';

@Facade()
export class UserFacade {
  @InjectService(UserService)
  private userService!: UserService;

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to get users: ${errorMessage}`);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.userService.getUserById(id);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to get user: ${errorMessage}`);
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    try {
      return await this.userService.searchUsers(query);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to search users: ${errorMessage}`);
    }
  }

  async createUser(data: UserCreateInput): Promise<User> {
    try {
      return await this.userService.createUser(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to create user: ${errorMessage}`);
    }
  }

  async updateUser(id: string, data: UserUpdateInput): Promise<User> {
    try {
      return await this.userService.updateUser(id, data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to update user: ${errorMessage}`);
    }
  }

  async patchUser(id: string, data: Partial<UserUpdateInput>): Promise<User> {
    try {
      return await this.userService.patchUser(id, data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to patch user: ${errorMessage}`);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.userService.deleteUser(id);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to delete user: ${errorMessage}`);
    }
  }
}