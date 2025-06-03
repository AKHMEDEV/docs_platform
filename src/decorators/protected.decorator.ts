import { SetMetadata } from '@nestjs/common';

export const PROTECTED_KEY = 'PROTECTED';

export const Protected = (isProtected: boolean = false) =>
  SetMetadata(PROTECTED_KEY, isProtected);
