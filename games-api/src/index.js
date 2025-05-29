import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// GET: listar todos os jogos
app.get('/games', async (_, res) => {
  try {
    const result = await pool.query('SELECT * FROM games');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET: listar jogo por ID
app.get('/games/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST: adicionar novo jogo
app.post('/games', async (req, res) => {
  const { titulo, ano, genero, publisher } = req.body;

  if (!titulo || !ano || !genero || !publisher) {
    return res.status(400).json({ erro: 'Todos os campos (titulo, ano, genero, publisher) são obrigatórios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO games (titulo, ano, genero, publisher) VALUES ($1, $2, $3, $4) RETURNING id',
      [titulo, ano, genero, publisher]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT: atualizar jogo por ID
app.put('/games/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, ano, genero, publisher } = req.body;

  if (!titulo || !ano || !genero || !publisher) {
    return res.status(400).json({ erro: 'Todos os campos (titulo, ano, genero, publisher) são obrigatórios' });
  }

  try {
    const result = await pool.query(
      'UPDATE games SET titulo = $1, ano = $2, genero = $3, publisher = $4 WHERE id = $5',
      [titulo, ano, genero, publisher, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    res.json({ atualizado: id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE: remover jogo por ID
app.delete('/games/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM games WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(3000, () => console.log('API rodando em http://0.0.0.0:3000'));
