export enum CardType {
  GOLDPLUS = 'goldplus',
  GOLD = 'gold',
  SILVER = 'silver',
  BLUE = 'blue',
  GRAY = 'gray'
}

export interface ImageFile {
  FileName: string;
  FileFormat: string;
  FileSize: number;
  File: string;
}