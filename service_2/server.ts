import { App } from './src/app';
import { DB } from './src/models/db';

let app = new App().express;
const port: number = parseInt(process.env['PORT']) || 4000;
const database = process.env['DATABASE_SERVER'] + '/' + process.env['DATABASE_NAME'];

process.on('SIGINT', () => {
  DB.disconnect().then(() => {
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
  DB.connect(database).then(() => {
    console.log(`Database connected! ${database}`);
  })
  .catch((err) => {
    console.error('Was not possible connect to database:')
    console.error(err);
  });
});
