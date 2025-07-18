// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { DataService } from '../../lib/dataService';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await DataService.getUsers();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
      break;

    case 'POST':
      try {
        const { name, email } = req.body;
        
        if (!name || !email) {
          return res.status(400).json({ error: 'Name and email are required' });
        }
        
        const newUser = await DataService.createUser({ name, email });
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}