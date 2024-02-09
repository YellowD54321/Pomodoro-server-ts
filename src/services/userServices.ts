import { testUserId } from '../config';
import { IUser } from '../models/userModel';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserById = async (userId: IUser['id']) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const getUserByGoogleId = async (
  googleId: string,
): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      google_id: googleId,
    },
  });

  return user;
};

export const registerUserByGoogle = async (googleId: string) => {
  const newUser = await prisma.user.create({
    data: {
      google_id: googleId,
    },
  });

  return newUser;
};

export const getTestAccountUser = async () => {
  const user = await prisma.user.findUnique({
    where: {
      id: testUserId,
    },
  });

  return user;
};

export const registerTestAccount = async () => {
  const newUser = await prisma.user.create({
    data: {
      id: testUserId,
    },
  });

  return newUser;
};
