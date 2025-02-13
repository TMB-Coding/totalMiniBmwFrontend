interface Tool {
  id: string;
  name: string;
  bmwGroup: number;
  bmwSubGroup: number;
  cabinet: string;
  location: string;
  image: string;
  condition: string;
  chassis: string;
  description: string;
  comments: Array<string>;
  barcode: number;
  toolBoard: string;
  user?: { firstName: string; lastName: string };
}

export { type Tool };
