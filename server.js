const express = require('express');
const path = require('path');
resuire(".env").config()

const PORT = process.env.PORT || 3001;

const app = express();
