
import express from 'express';
import cors from 'cors';
import { prisma } from './db';

const app = express();
app.use(cors());
app.use(express.json());

// Event query endpoints
app.get('/events/lottery/games', async (req, res) => {
      try {
        const events = await prisma.game.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch lottery-GameCreated:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/lottery/tickets', async (req, res) => {
      try {
        const events = await prisma.ticket.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch lottery-TicketPurchase:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
