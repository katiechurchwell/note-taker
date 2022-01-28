const express = require('express');
const apiRoutes = require('/routes/apiRoutes');
const htmlRoutes = require('/routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming data
app.use(express.urlencoded({ extended: true })); // accept string and array as request
app.use(express.json()); // accept json as request
app.use(express.static('public')); // make client access public files

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
