const express = require('express')
const app = express()
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
const DATABASE_NAME = "Appdev1670";
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://hiepdqgch18021:hiep1234@cluster0.jks3x.mongodb.net/Appdev1670'

app.get('/', async(req, res) => {
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const total = await dbo.collection("totalCourse").find({}).toArray();
    res.render('trainerIndex', { dataTotal: total });
    return dbo;
})

app.get('/', async(req, res) => {
    res.redirect("/trainerIndex")
})


app.get('/listTrainee', async(req, res) => {
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const allTrainee = await dbo.collection("listTrainee").find({}).toArray();
    res.render('ListTrainee', { dataTrainee: allTrainee });
    return dbo;
})

app.get('/GradeTrainee', async(req, res) => {
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const allGrade = await dbo.collection("listGrade").find({}).toArray();
    res.render('GradeTrainee', { data: allGrade });
    return dbo;
})

// --------------------------------------------------- course Detail
app.get('/CourseDetail', async(req, res) => {
    const idCourse = req.query.id;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    var ObjectId = require('mongodb').ObjectId;
    const dataCourse = await dbo.collection("listCourse").find({
        'name': idCourse
    }).toArray();
    res.render('CourseDetail', { CourseData: dataCourse });
    return dbo;

})

// ---------------------------------------------------TrainerIndex

app.post('/addListTotal', async(req, res) => {
    const CourseID = req.body.txtCourseId;
    const GradeID = req.body.txtGradeId;
    const TraineeID = req.body.txtTraineeId;
    var ObjectId = require('mongodb').ObjectId;
    const Course_Grade_Trainee = {
        CourseID: CourseID,
        GradeID: GradeID,
        TraineeID: TraineeID
    }
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const newObject = await dbo.collection("totalCourse").insertOne(Course_Grade_Trainee);
    res.redirect("/Trainer");
})
app.post('/searchTotal', async(req, res) => {
    const searchInput = req.body.txtSearchCourse;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const listCourse = await dbo.collection("totalCourse").find({ CourseID: searchInput }).toArray();
    res.render('trainerIndex', { dataTotal: listCourse })
});

// -- -- -- -- -- -- -- -- -- -- -- ---------------- ----------------------------GradeTrainee

app.post('/addGrade', async(req, res) => {
    const nameInput = req.body.txtTraineeGrade;
    const traineeId = req.body.txtTraineeId;
    const courseName = req.body.txtCourseName;
    const typeGrade = req.body.typeGrade;
    const newGrade = {
        name: nameInput,
        TraineeID: traineeId,
        CourseName: courseName,
        TypeGrade: typeGrade
    }
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listGrade").insertOne(newGrade);
    res.redirect("/GradeTrainee");
})

app.post('/searchGrade', async(req, res) => {
    const searchInput = req.body.txtSearch;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const allGrade = await dbo.collection("listGrade").find({ TraineeID: searchInput }).toArray();
    res.render('GradeTrainee', { data: allGrade })
});

app.get('/deleteGrade', async(req, res) => {
    const id = req.query.id;
    var ObjectId = require('mongodb').ObjectId;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listGrade").deleteOne({ "_id": ObjectId(id) });
    res.redirect("/GradeTrainee");
});

app.get('/editGrade', async(req, res) => {
    const id = req.query.id;
    var ObjectId = require('mongodb').ObjectId;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const g = await dbo.collection("listGrade").findOne({
        _id: ObjectId(id)
    });
    res.render('editGrade', { changeGrade: g });
})

app.post('/updateGrade', async(req, res) => {
    const id = req.body.txtId;
    var ObjectId = require('mongodb').ObjectId;
    const nameInput = req.body.txtTraineeGrade;
    const typeGrade = req.body.typeGrade;
    const filter = { _id: ObjectId(id) }
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listGrade").updateOne(filter, { $set: { TypeGrade: typeGrade } })
    res.redirect("/GradeTrainee");
})


// // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --------- ------------------------ manage trainee


app.post('/ListTrainee', async(req, res) => {
    const idInput = req.body.txtID;
    const nameInput = req.body.txtName;
    const gmailInput = req.body.txtGmail;
    const ageInput = req.body.txtAge;
    const BirthdayInput = req.body.txtBirthday;
    const newTrainee = { ID: idInput, Name: nameInput, Gmail: gmailInput, Age: ageInput, Birthday: BirthdayInput }
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listTrainee").insertOne(newTrainee);
    res.redirect("/ListTrainee");
})

app.get('/deleteTrainee', async(req, res) => {
    const id = req.query.id;
    var ObjectId = require('mongodb').ObjectId;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection("listTrainee").deleteOne({ "_id": ObjectId(id) });
    res.redirect("/ListTrainee");
});
app.post('/searchTrainee', async(req, res) => {
    const searchTrainee = req.body.txtSearchTrainee;
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    const trainee = await dbo.collection("listTrainee").find({ ID: searchTrainee }).toArray();
    res.render('ListTrainee', { dataTrainee: trainee })
});

const PORT = process.env.PORT || 5001
app.listen(PORT)
console.log("Server is running! " + PORT)