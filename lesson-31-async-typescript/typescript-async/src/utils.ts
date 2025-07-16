export const sortById = <T extends {id: number}>(arr: T[]): T[] => {
    return [...arr].sort((a, b) => a.id - b.id);
  };