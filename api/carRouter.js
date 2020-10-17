const express = require("express")
const db = require("../data/config")

const router = express.Router()

// to fetch all cars list
router.get("/", async (req, res, next) => {
    try {
        const cars = await db("cars")
        res.json(cars)
    } catch(err) {
        next(err)
    }
})

// to fetch an specific car id
router.get("/:id", async (req, res, next) => {
	try {
		const [cars] = await db("cars")
			.where("carId", req.params.id)
			.limit(1)

		res.json(cars)
	} catch(err) {
		next(err)
	}
})

// to add a new car to the list
router.post("/", async (req, res, next) => {
    try {
    
    const payload =  {
        VIN: req.body.VIN,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        transmissionType: req.body.transmissionType,
        titleStatus: req.body.titleStatus
    }
     if ( !payload.VIN || !payload.make || !payload.model || !payload.mileage || !payload.transmissionType || !payload.titleStatus )  {
         return res.status(400).json({
             message: "need VIN, make, mode, mileage, transmissionType, and titleStatus fields"
         })
     }

     //INSERT INTO messages (title, contents) VALUES (?,?) 
     const [id] = await db.insert(payload).into("cars")
     const car = await db
     .first("*") //shortcut for destructuring the array and limit to 1
     .from("cars")
     .where("carId", id)
  
    res.json(car)
 } catch (err) {
     next(err)
 }
})

// to edit a specific car from the list
// to edit a specifi list in accounts
router.put("/:id", async (req, res, next) => {
    try {
    
        const payload =  {
            VIN: req.body.VIN,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            transmissionType: req.body.transmissionType,
            titleStatus: req.body.titleStatus
        }
         if ( !payload.VIN || !payload.make || !payload.model || !payload.mileage || !payload.transmissionType || !payload.titleStatus )  {
             return res.status(400).json({
                 message: "need VIN, make, mode, mileage, transmissionType, and titleStatus fields"
             })
         }
    
         //UPDATE messages SET title = ? AND contents = ? WHERE id = ?
         await db("cars").where("carId", req.params.id).update(payload)
         const cars = await db
         .first("*") //shortcut for destructuring the array and limit to 1
         .from("cars")
         .where("carId", req.params.id)
      
        res.json(cars)
     } catch (err) {
         next(err)
     }
})

// to delete a specific cars from the list
router.delete("/:id", async (req, res, next) => {
    try {
       //DELETE FROM messages WHERE id = ?
       await db("cars").where("carId", req.params.id).del()
       res.status(204).end()
     } catch (err) {
         next(err)
     }
})


module.exports = router