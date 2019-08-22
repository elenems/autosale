const { db } = require("../util/admin");
const {
  validateCarAge,
  validateCarPrice,
  isEmpty
} = require("../util/validators");

exports.getCars = (req, res) => {
  let cars = [];
  db.collection("cars")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        cars.push(Object.assign({ id: doc.id }, doc.data()));
      });
      return res.status(200).json(cars);
    })
    .catch(err => {
      return res.status(404).json({ err });
    });
};

exports.getCar = (req, res) => {
  const id = req.query.id;
  db.collection("cars")
    .doc(id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ noSuchDocError: "No such document" });
      } else {
        return res.status(200).json(Object.assign({ id: doc.id }, doc.data()));
      }
    })
    .catch(err => {
      return res.status(403).json({ err });
    });
};

exports.getUserCars = (req, res) => {
  const addedBy = req.query.addedBy;
  let cars = [];
  db.collection("cars")
    .where("addedBy", "==", addedBy)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        cars.push(Object.assign({ id: doc.id }, doc.data()));
      });
      return res.status(200).json(cars);
    })
    .catch(err => {
      return res.status(404).json({ err });
    });
};

exports.addCar = (req, res) => {
  const errors = {};
  const age = validateCarAge(req.body.age);
  const price = validateCarPrice(req.body.price);
  const manufacturer = isEmpty(req.body.manufacturer);
  const model = isEmpty(req.body.model);

  if (!price.valid) {
    errors["priceError"] = price.message;
  }

  if (!manufacturer.valid) {
    errors["manufacturerError"] = manufacturer.message;
  }

  if (!model.valid) {
    errors["modelError"] = model.message;
  }

  if (!age.valid) {
    errors["ageError"] = age.message;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  let car = {
    addedBy: req.body.addedBy,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    price: req.body.price,
    age: req.body.age,
    date: new Date().toLocaleString()
  };

  db.collection('cars').add(car)
  .then(() => {
      return res.status(200).json({message: 'Car has been added'})
    })
    .catch(err => {
        return res.status(403).json({err})
    })
};

exports.removeCar = (req, res) => {
  db.collection("cars")
    .doc(req.body.carId)
    .delete()
    .then(() => {
      return res.status(200).json({ message: "Deleted successfuly" });
    })
    .catch(err => {
      return res.status(403).json(err);
    });
};

exports.updateCar = (req, res) => {
  const errors = {};
  const age = validateCarAge(req.body.age);
  const price = validateCarPrice(req.body.price);
  let car;
  let newCar = req.body;

  if (!age.valid) {
    errors["ageError"] = age.message;
  }

  if (!price.valid) {
    errors["priceError"] = price.message;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(403).json(errors);
  }

  db.collection("cars")
    .doc(req.body.carId)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(400).json({ noSuchDocError: "No such document" });
      } else {
        car = doc.data();
        return db
          .collection("cars")
          .doc(req.body.carId)
          .set(Object.assign(car, newCar));
      }
    })
    .then(() => {
      return res.status(200).json({ message: "Car has been updated" });
    })

    .catch(err => {
      return err;
    });
};
