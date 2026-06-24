const {
  predictThreat,
} = require("./services/mlService");

(async () => {
  const result =
    await predictThreat(
      35,
      9000,
      8500
    );

  console.log(result);
})();