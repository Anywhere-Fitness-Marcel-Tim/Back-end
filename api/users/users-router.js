const router = require("express").Router();
const {
    checkUserExists,
    checkUserPayload,
    checkUserModifiedPayload,
} = require("../middlewares/user-middlewares");
const userModel = require("./users-model");

router.get("/", (req, res, next) => {
    userModel
        .find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(next);
});

router.get("/:id", checkUserExists, (req, res, next) => {
    userModel
        .findById(req.params.id)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(next);
});

router.put(
    "/:id",
    checkUserExists,
    checkUserModifiedPayload,
    (req, res, next) => {
        userModel
            .modify(req.params.id, req.body)
            .then((updatedUser) => {
                res.status(201).json(updatedUser);
            })
            .catch(next);
    }
);

router.post("/", checkUserPayload, (req, res, next) => {
    userModel
        .add(req.body)
        .then((newUser) => {
            res.status(201).json(newUser);
        })
        .catch(next);
});

router.delete("/:id", checkUserExists, (req, res, next) => {
    userModel
        .remove(req.params.id)
        .then((deletedUser) => {
            res.status(200).json({ ...deletedUser, message: "User Removed" });
        })
        .catch(next);
});

module.exports = router;
