
import express from 'express';
import cors from 'cors';
import { prisma } from './db';

const app = express();
app.use(cors());
app.use(express.json());

// Event query endpoints
app.get('/events/lottery/game-created', async (req, res) => {
      try {
        const events = await prisma.gameCreated.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch lottery-GameCreated:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/lottery/ticket-purchase', async (req, res) => {
      try {
        const events = await prisma.ticketPurchase.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch lottery-TicketPurchase:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/lottery/winner-determined', async (req, res) => {
      try {
        const events = await prisma.winnerDetermined.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch lottery-WinnerDetermined:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/lottery/reward-chaimed', async (req, res) => {
      try {
        const events = await prisma.rewardChaimed.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch lottery-RewardChaimed:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/lottery/ticket-destroyed', async (req, res) => {
      try {
        const events = await prisma.ticketDestroyed.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch lottery-TicketDestroyed:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
