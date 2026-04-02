import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string): string => {
  const secret = process.env.JWT_ACCESS_SECRET!;
  return jwt.sign({ userId }, secret, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string): string => {
  const secret = process.env.JWT_REFRESH_SECRET!;
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string): any => {
  const secret = process.env.JWT_ACCESS_SECRET!;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

export const verifyRefreshToken = (token: string): any => {
  const secret = process.env.JWT_REFRESH_SECRET!;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};