import { UniqueIdentifier } from '@dnd-kit/core';

export type Board = Record<UniqueIdentifier, UniqueIdentifier[]>;

export type TouchedField = {
  id: UniqueIdentifier;
  container: UniqueIdentifier;
};
