module.exports = {
  HOST: "18.141.178.134",
  USER: "admin",
  PASSWORD: "123",
  DB: "test",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
