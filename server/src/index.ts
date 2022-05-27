// TODO: build your application here
import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

const main = async (): Promise<void> => {
// TODO: start your application here
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

main().catch(console.error);
