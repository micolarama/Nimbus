console.log("🔧 Server dimulai...");

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // untuk membaca body JSON dari request
// Simpan user secara sementara (di memori)
const users = [];

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // Cek jika username sudah ada
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username sudah terdaftar' });
  }

  // Simpan user baru
  users.push({ username, password });
  console.log('📝 Pendaftaran berhasil:', username);
  res.json({ message: 'Registrasi berhasil' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Cari user yang cocok
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Username atau password salah' });
  }

  console.log('🔓 Login berhasil:', username);
  res.json({ message: 'Login berhasil' });
});

const port = 3000;

app.get('/', (req, res) => {
  res.send('✅ Server aktif dan merespons!');
});

app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
