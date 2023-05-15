const router = require("express").Router();
const { Event } = require("../../models");

// create event
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    req.body.passed = false;
    await Event.create(req.body);
    return res.status(200).json("event scheduled");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all future events
router.get("/", async (req, res) => {
  try {
    const events = await Event.findAll({ where: { passed: false } });

    if (events) {
      return res.status(200).json(events);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// update event
router.put("/:id", async (req, res) => {
  try {
    const eventData = await Event.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(eventData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete event
router.delete("/:id", async (req, res) => {
  try {
    await Event.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("event deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
