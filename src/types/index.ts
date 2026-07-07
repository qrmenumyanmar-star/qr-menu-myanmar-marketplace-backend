export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  active: boolean;
  createdAt: string;
};

export type QuotationLine = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type Quotation = {
  id: string;
  reference: string;
  customerId: string;
  customerName: string;
  status: 'draft' | 'sent' | 'confirmed' | 'cancelled';
  lines: QuotationLine[];
  total: number;
  createdAt: string;
};
