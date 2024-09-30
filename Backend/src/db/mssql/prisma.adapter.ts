import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../utils/custom-error.util';
import { NextFunction } from 'express';

export class PrismaAdapter {
  private static _instance: PrismaAdapter;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): PrismaAdapter {
    if (!PrismaAdapter._instance) {
      PrismaAdapter._instance = new PrismaAdapter();
    }
    return PrismaAdapter._instance;
  }

  private getModel(model: string) {
    const modelName = model.toLowerCase();
    if (!(modelName in this.prisma)) {
      throw new Error(`Model ${model} not found in Prisma client`);
    }
    return this.prisma[modelName as keyof PrismaClient] as any;
  }

  public async create(model: string, values: object, next: NextFunction): Promise<any> {
      return await this.getModel(model).create({ data: values });
  }

  public async findOne(model: string, where: object, next: NextFunction): Promise<any | null> {
      return await this.getModel(model).findFirst({ where });
  }

  public async findAll(model: string, where: object, next: NextFunction): Promise<any[]> {
      return await this.getModel(model).findMany({ where });
  }

  public async update(model: string, data: object, where: object, next: NextFunction): Promise<any> {
      return await this.getModel(model).update({ where, data });
  }

  public async destroy(model: string, where: object, next: NextFunction): Promise<any> {
      return await this.getModel(model).delete({ where });
  }
}
