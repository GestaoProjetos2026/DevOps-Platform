import { db } from '../database';
import { Order, OrderItem } from '../models/Order';

export class OrderRepository {
  async create(order: Order, items: Omit<OrderItem, 'id' | 'order_id'>[]): Promise<Order> {
    // Para simplificar, faremos de forma sequencial com queries diretas
    // (O better-sqlite3 suporta transações, mas faremos execução sequencial simples para o MVP)
    
    // Inserir Order
    const sqlOrder = 'INSERT INTO orders (id, customer_name, customer_email, total_amount, status, created_at) VALUES (?, ?, ?, ?, ?, ?)';
    db.execute(sqlOrder, [
      order.id,
      order.customer_name,
      order.customer_email,
      order.total_amount,
      order.status,
      order.created_at
    ]);

    // Inserir Items
    const sqlItem = 'INSERT INTO order_items (id, order_id, module_id, module_name, price) VALUES (?, ?, ?, ?, ?)';
    const createdItems: OrderItem[] = [];

    for (const item of items) {
      const itemId = crypto.randomUUID();
      db.execute(sqlItem, [
        itemId,
        order.id,
        item.module_id,
        item.module_name,
        item.price
      ]);
      createdItems.push({
        id: itemId,
        order_id: order.id,
        module_id: item.module_id,
        module_name: item.module_name,
        price: item.price
      });
    }

    order.items = createdItems;
    return order;
  }

  async getAll(): Promise<Order[]> {
    return db.query<Order>('SELECT * FROM orders');
  }
}
