import { Request, Response } from 'express';
import { OrderRepository } from '../repositories/OrderRepository';
import crypto from 'crypto';

const orderRepository = new OrderRepository();

export class OrderController {
  async getAll(req: Request, res: Response) {
    try {
      const orders = await orderRepository.getAll();
      return res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar pedidos.' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { customerName, customerEmail, items } = req.body;

      if (!customerName || !customerEmail) {
        return res.status(400).json({ error: 'Nome e Email são obrigatórios.' });
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'O carrinho não pode estar vazio.' });
      }

      const orderId = crypto.randomUUID();
      const totalAmount = items.reduce((acc, item) => acc + parseFloat(item.price), 0);

      const newOrder = {
        id: orderId,
        customer_name: customerName,
        customer_email: customerEmail,
        total_amount: totalAmount,
        status: 'completed',
        created_at: new Date().toISOString()
      };

      const orderItems = items.map(item => ({
        module_id: item.id,
        module_name: item.title,
        price: parseFloat(item.price)
      }));

      const createdOrder = await orderRepository.create(newOrder, orderItems);

      return res.status(201).json({
        message: 'Pedido criado com sucesso!',
        order: createdOrder
      });
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ error: 'Erro interno ao processar o pedido.' });
    }
  }
}
