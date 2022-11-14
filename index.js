const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
});

axiosInstance.interceptors.request.use((config) => {
  const token = process.env.VITE_GH_PERSONAL_ACCESS_TOKEN;
  if (config.headers) {
    config.headers.authorization = `Bearer ${token}`;
    config.headers.accept = 'application/vnd.github+json';
  }
  return config;
});

app.post('/contents', async (req, res) => {
  try {
    const { contents_url } = req.body;
    const response = await axios.get(contents_url);
    const buffer = Buffer.from(response.data.content, 'base64');
    const content = buffer.toString('utf-8');
    res.send(content);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
