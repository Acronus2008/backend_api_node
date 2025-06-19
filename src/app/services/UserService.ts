import { Service, InjectRepository } from '../decorators';
import { UserRepository } from './repository/UserRepository';
import { User, UserCreateInput, UserUpdateInput } from '../types/user.types';

@Service()
export class UserService {
  @InjectRepository(UserRepository)
  private userRepository!: UserRepository;

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.userRepository.search(query);
  }

  async createUser(data: UserCreateInput): Promise<User> {
    // Basic validation
    if (!data || !data.email.includes('@')) {
      throw new Error('Invalid email address');
    }

    return this.userRepository.create(data);
  }

  async updateUser(id: string, data: UserUpdateInput): Promise<User> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Validate email if it's being updated
    if (data.email && !data.email.includes('@')) {
      throw new Error('Invalid email address');
    }

    return this.userRepository.update(id, data);
  }

  async patchUser(id: string, data: Partial<UserUpdateInput>): Promise<User> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Validate email if it's being updated
    if (data?.email && !data?.email.includes('@')) {
      throw new Error('Invalid email address');
    }

    return this.userRepository.patch(id, data);
  }

  async deleteUser(id: string): Promise<User> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    return this.userRepository.delete(id);
  }
}