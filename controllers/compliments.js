const compliment = require("../models/Compliments");

module.exports = {
  getCompliment: async (req, res) => {
    try {
      const randomCompliment = await getRandomCompliment();
      res.render("compliments.ejs", { compliment: randomCompliment });
    } catch (err) {
      console.error(err);
      res.render("/errors/error.ejs");
    }
  },
  getNewCompliment: async (req, res) => {
    try {
      const randomCompliment = await getRandomCompliment();
      res.send(randomCompliment);
    } catch (err) {
      console.error(err);
      res.render("/errors/error.ejs");
    }
  },
  putCompliment: async (req, res) => {
    try {
      let compliment = req.body.compliment;
      await compliment.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { compliments: compliment } }
      );
    } catch (error) {
      console.error(error);
      res.render("error/500");
    }
  },
};

async function getRandomCompliment() {
  const randomCompliment = await compliment.aggregate([
    { $sample: { size: 1 } },
  ]);
  return randomCompliment[0];
}
