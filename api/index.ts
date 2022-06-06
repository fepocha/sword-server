import express, { Request, Response } from 'express';

const app = express();
app.get('/api', (req: Request, res: Response) => {
  const path = `/api/item`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

export default app;
