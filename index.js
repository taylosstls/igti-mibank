import express from 'express';
import accountsRouter from './routes/accounts.js'
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile("accounts.js");
    console.log("API started!");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: []
    };
    writeFile("accounts.js", JSON.stringify(initialJson))
      .then(() => {
        console.log("API started and file created!");
      })
      .catch(err => {
        console.log(err);
      });
  }
});