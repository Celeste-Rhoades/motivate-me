const motivation = require("../models/Motivation");

module.exports = {
  getMotivation: async (req, res) => {
    try {
      const randomMotivation = await getRandomMotivation();
      res.render("motivation.ejs", { motivation: randomMotivation });
    } catch (err) {
      console.error(err);
      res.render("/errors/error.ejs");
    }
  },
  getNewMotivation: async (req, res) => {
    try {
      const randomMotivation = await getRandomMotivation();
      res.send(randomMotivation);
    } catch (err) {
      console.error(err);
      res.render("/errors/error.ejs");
    }
  },
  putMotivation: async (req, res) => {
    try {
      let motivation = req.body.motivation;
      await motivation.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { motivations: motivation } }
      );
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
};

async function getRandomMotivation() {
  const randomMotivation = await motivation.aggregate([
    { $sample: { size: 1 } },
  ]);
  return randomMotivation[0];
}
