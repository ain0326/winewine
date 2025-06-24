const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const API_URL = 'https://gateway.ax.gsretail.com/ext/v1';
const API_KEY = 'app-9iqdLrxUu7tGS3BP9fz4xqqc';

app.use(express.json());

app.post('/recommend', async (req, res) => {
  try {
    const userInput = req.body.message;

    if (!userInput) {
      return res.status(400).json({ error: '"message" 항목이 필요합니다.' });
    }

    const response = await axios.post(API_URL, {
      prompt: userInput // ⚠️ 회사 API가 요구하는 키가 "prompt"가 맞는지 확인
    }, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('⛔ API 호출 오류:', err.response?.data || err.message);
    res.status(500).json({
      error: '회사 API 호출 실패',
      details: err.response?.data || '알 수 없는 오류'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
