
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  modelUrl: string; // .glb file
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  stock: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export enum ViewMode {
  HOME = 'home',
  ADMIN = 'admin',
  CONSULTANT = 'consultant',
  DETAIL = 'detail'
}
