export type CheckoutFormValues = {
  fullName: string;
  addressLine1: string;
  city: string;
  stateProvince: string;
  zipPostal: string;
  country: string;
  email: string;
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
};

export type PlaceOrderPayload = CheckoutFormValues & {
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};
