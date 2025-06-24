const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
app.post('/recommend', async (req, res) => {
 try {
   const userInput = req.body.message;
   const response = await axios.post('https://miso.gsretail.com/chatList/P3AvpKEFnD7L7MPq/ai', {
     prompt: userInput
   }, {
     headers: {
       'Authorization': 'Bearer app-9iqdLrxUu7tGS3BP9fz4xqqc'
     }
   });
   res.json(response.data);
 } catch (err) {
   console.error(err.response?.data || err.message);
   res.status(500).json({ error: 'Internal API 호출 실패' });
 }
});
app.listen(3000, () => console.log('Proxy server running on port 3000'));
