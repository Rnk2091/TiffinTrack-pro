// Import express and types
import path from 'path';
import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Enable JSON parsing for incoming requests
app.use(express.json()); // Middleware to parse JSON body

app.use(express.static(path.join(__dirname, 'public')));

// Add a global array to store orders dynamically 

let orders: {
  id: number;
  item: string;
  quantity: number;
  total: number;
}[] = [];

// Menu items
const menu = [
  { id: 1, item: 'Gujarati Thali', price: 120 },
  { id: 2, item: 'Kathiyawadi Combo', price: 150 },
  { id: 3, item: 'Jain Tiffin', price: 100 }
];

// GET / -> returns full menu
app.get('/', (req: Request, res: Response) => {
  res.json(menu);
});

// POST /order -> places an order
app.post('/order', (req: Request, res: Response) => {
  const { itemId, quantity } = req.body;

  if (!itemId || !quantity) {
    return res.status(400).json({ error: 'Item ID and quantity are required' });
  }

  const selectedItem = menu.find(m => m.id === itemId);

  if (!selectedItem) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const total = selectedItem.price * quantity;
  
  // static response with dynamic order saving

  const newOrder = {
    id: orders.length + 1,
    item: selectedItem.item,
    quantity,
    total
  };

  orders.push(newOrder); 
  // save order to global array

  res.json({
    ...newOrder,
    message: 'Order placed successfully!'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 14 sep 2025 continue the project where I left 
// GET /order/:id -> fetch specific order

app.get('/order/:id', (req: Request, res: Response) =>{

  if(!req.params.id) {
    return res.status(400).json({ error: 'Order ID is required'});
  }

  const orderId = parseInt(req.params.id as string);

  /* Simulated order history
  const orders = [
    {id: 1, item: 'Gujarati Thali', quantity: 2, total: 240},
    {id: 2, item: 'Kathiyawadi Combo', quantity: 1, total: 150},
    {id: 3, item: 'Jain Tiffin', quantity: 3, total: 300},
  ]; */

  const order = orders.find( o => o.id === orderId);

  if(!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(order);
});