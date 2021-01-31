import app from './express';

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', 3000);
});
