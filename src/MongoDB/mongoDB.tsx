import mongoose from 'mongoose';

// const URL = 'mongodb+srv://student:1234qwer@cluster0.n1cm5.mongodb.net/app?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
