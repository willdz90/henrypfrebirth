const router = require("express").Router();
const { Adoption } = require("../db");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const adoption = await Adoption.findAll({ where: { petId: id } });
    if (!adoption) {
      res.status(404).send("no se encontro la solicitud con esa mascota");
    } else {
      res.status(200).send(adoption);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allAdoption = await Adoption.findAll();
    allAdoption.length
      ? res.status(200).send(allAdoption)
      : res.status(404).send("No se encuentra ninguna adopcion");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      age,
      gender,
      address,
      phone,
      otherpets,
      comments,
      userMail,
      petId,
    } = req.body;
    const adoption = await Adoption.findOrCreate({
      where: { userMail, petId },
      defaults: {
        age,
        gender,
        address,
        phone,
        otherpets,
        comments,
        userMail,
        petId,
      },
    });
    if (adoption) {
      res.status(201).send(`La solicitud fue creada con exito ${adoption}`);
    } else {
      res.status(404).send("no se encontro");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
