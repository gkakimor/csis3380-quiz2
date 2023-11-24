import mongoose from "mongoose";

const uri = `mongodb+srv://gabikaki:PNl4zMzV8ni8xDFg@cluster0.iaohist.mongodb.net/Exams23001`;
//'mongodb://localhost:27017/Exams23001'


mongoose.connect(uri, {
    useNewUrlParser: true
});

const studentSquema = new mongoose.Schema({
    name: String,
    sid: String
  });

// defining model
const Student = mongoose.model("Student", studentSquema);

 const stud1 = new Student({
     name: "Gabriela Kakimori Simoes",
     sid: "300373304"
   });
   stud1.save()
   .then(() => {
    console.log("Student saved");
    mongoose.connection.close();
   });
   