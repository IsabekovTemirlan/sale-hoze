const config = {
  dirname: process.cwd(),
  secret: "SECRET_KEY",
  PORT: 5000,
  CONNECTION_URL: "mongodb+srv://isabekovtemirlan:isabekov99@cluster0.nci92.mongodb.net/<dbname>?retryWrites=true&w=majority",
  CONNECTION_URL_LOCAL: "mongodb://localhost/sale-hoze-db"
};

export default config;