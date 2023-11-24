import mongoose from "mongoose";
import express, { response } from "express";

const app = express();
app.use(express.json());

const uri = `mongodb+srv://gabikaki:PNl4zMzV8ni8xDFg@cluster0.iaohist.mongodb.net/Exams23001`;


mongoose.connect(uri, {
    useNewUrlParser: true
});

const studentSquema = new mongoose.Schema({
    name: String,
    sid: String
  });

// defining model
const Student = mongoose.model("Student", studentSquema);

app.post('/', async (req, res) => {
    const name = req.body.name;
    const sid = req.body.sid;

    const newStudent = { name, sid };

    new Student(newStudent)
        .save()
        .then((savedStudent) => {
            const { _id, name, sid } = savedStudent;
            return res.status(201).json({ _id, name, sid })
        })
        .catch((err) => {
            return res.status(400).json({ "message": err })
        });
})

app.get("/", async (req, res) => {

    Student.find()
        .then((student) => {
            return res.json(student);
        })
        .catch((err) => {
            return res.status(400).json({ "message": err })
        });
})

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
});

app.listen(3000, () => console.log('Server listening on port 3000!'));