export interface OrderItem {
  id: string;
  order_id: string;
  module_id: string;
  module_name: string;
  price: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  created_at: string;
  items?: OrderItem[];
}
