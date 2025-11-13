const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api-node/hello', (req, res) => {
  res.json({ message: 'Hello from Node API!' });
});

app.listen(3000, () => console.log('Node API running on port 3000'));
