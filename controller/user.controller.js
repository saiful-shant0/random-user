const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

const getAllUsers = async (req, res, next) => {
  try {
    const db = getDb();
    const user = await db.collection("users").find({}).toArray();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const getRandomUsers = async (req, res, next) => {
  try {
    const db = getDb();
    const user = await db.collection("users").find({}).toArray();
    const randomUser = await user[Math.floor(Math.random() * user.length)];
    res.status(200).json({ success: true, data: randomUser });
  } catch (error) {
    next(error);
  }
};

const addAUser = async (req, res, next) => {
  try {
    const db = getDb();
    const user = req.body;
    const result = await db.collection("users").insertOne(user);

    if (!result.insertedId) {
      return res
        .status(400)
        .send({ status: false, error: "Something went wrong!" });
    }
    res.send({
      success: true,
      message: `User Added with id: ${result.insertedId}`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAUser = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid user id." });
    }
    const user = await db.collection("users").deleteOne({ _id: ObjectId(id) });
    if (!user.deletedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Couldn't delete the user" });
    }

    res
      .status(200)
      .json({ success: true, message: "Successfully deleted the user" });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid user id." });
    }

    const user = await db
      .collection("users")
      .updateOne({ _id: ObjectId(id) }, { $set: req.body });

    if (!user.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Couldn't update the user" });
    }
   
    res
      .status(200)
      .json({ success: true, message: "Successfully updated the user" });
  } catch (error) {
    next(error);
  }
};

const updateManyUser = async (req, res, next) => {
  try {
    const db = getDb();
    const req_ids = req.body;
    for (let i = 0; i < req.body.length; i++) {
      if (!ObjectId.isValid(req_ids[i])) {
        return res
          .status(400)
          .json({ success: false, error: "Not a valid user id." });
      }

      const user = await db.collection("users").updateMany(
        { _id: ObjectId(req_ids[i]) },
        {
          $set: {
            address: "Bangladesh",
          },
        }
      );

      if (!user.modifiedCount) {
        return res
          .status(400)
          .json({ success: false, error: "Couldn't update users" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Successfully updated users" });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  addAUser,
  deleteAUser,
  updateUser,
  getRandomUsers,
  updateManyUser,
};
