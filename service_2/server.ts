import { App } from './src/app';
import { DB } from './src/models/db';

let app = new App().express;
const port: number = parseInt(process.env['PORT']) || 4000;

process.on('SIGINT', function() {
  DB.disconnect().then(() => {
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
  DB.connect().then(() => {
    console.log('Database connected!')
  })
  .catch((err) => {
    console.error('Was not possible connect to database:')
    console.error(err);
  });
});
