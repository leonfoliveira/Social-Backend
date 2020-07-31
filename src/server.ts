import app from './app';

const port = process.env.PORT || 4000;

const server = app.listen(port);

export default server;
