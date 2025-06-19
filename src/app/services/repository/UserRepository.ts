import { Repository } from '../../decorators';
import { PrismaClient } from '@prisma/client';
import { User, UserCreateInput, UserUpdateInput } from '../../types/user.types';

@Repository()
export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  async search(query: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { email: { contains: query } }
        ]
      }
    });
  }

  async create(data: UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data
    });
  }

  async update(id: string, data: UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  async patch(id: string, data: Partial<UserUpdateInput>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id }
    });
  }
}
