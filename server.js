console.log("🔧 Server dimulai...");

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // untuk membaca body JSON dari request

// Simpan user sementara (di memori)
const users = [];

app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Semua kolom harus diisi' });
  }

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username sudah terdaftar' });
  }

  const createdAt = new Date().toISOString(); // tanggal daftar

  users.push({ username, password, email, createdAt });
  console.log('📝 Pendaftaran berhasil:', { username, email });
  res.json({ message: 'Registrasi berhasil' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Username atau password salah' });
  }

  console.log('🔓 Login berhasil:', username);
  res.json({
    message: 'Login berhasil',
    email: user.email,
    createdAt: user.createdAt
  });
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('✅ Server aktif dan merespons!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server berjalan di http://0.0.0.0:${port}`);
});
