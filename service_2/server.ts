import { App } from './src/app';

let app = new App().express;
const port: number = parseInt(process.env['PORT']) || 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
