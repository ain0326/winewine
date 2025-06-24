const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const API_URL = 'https://gateway.ax.gsretail.com/ext/v1';
const API_KEY = 'app-9iqdLrxUu7tGS3BP9fz4xqqc';

app.use(express.json());

app.post('/recommend', async (req, res) => {
  try {
    // 1. 입력값 검사
    const userInput = req.body.message;
    if (!userInput) {
      return res.status(400).json({ error: '요청에 "message" 값이 필요합니다.' });
    }

    // 2. 회사 API에 요청
    const response = await axios.post(API_URL, {
      input: userInput
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);

  } catch (err) {
    console.error('📛 에러 발생:', err.response?.data || err.message);

    if (err.response) {
      return res.status(err.response.status).json({
        error: '회사 API 오류',
        details: err.response.data
      });
    }

    res.status(500).json({ error: '서버 오류 또는 회사 API 호출 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 프록시 서버 실행 중: http://localhost:${PORT}`);
});
