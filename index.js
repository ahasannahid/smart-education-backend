const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();

// middleware
app.use(cors());
app.use(express.json());




// const URI = "mongodb://127.0.0.1:27017";
const uri = "mongodb+srv://smartedu:IM9irzCSDKqG3Jgf@cluster0.qbh9oi5.mongodb.net/?retryWrites=true&w=majority"
// console.log(uri); //mongodb://localhost:27017/smart-education
const client = new MongoClient(uri, { useNewUrlParser: true});

async function run() {
    try {
        const activitiesCollection = client.db('smart-education').collection('activities');
        const chapterCollection = client.db('smart-education').collection('chapter');
        // const teacherChapterCollection = client.db('smart-education').collection('tracherChapter');
        const classMaterialCollection = client.db('smart-education').collection('class-material');
        const groupActivitiesCollection = client.db('smart-education').collection('group-activities');
        const repositoryCollection = client.db('smart-education').collection('repository');
        const resourcesCollection = client.db('smart-education').collection('resources');
        const singleActivitiesCollection = client.db('smart-education').collection('single-activities');
        const amarJiggasaCollection = client.db('smart-education').collection('amrjiggasa');

        app.get('/activities', async (req, res) => {
            const query = {};
            const activities = await activitiesCollection.find(query).toArray();
            res.send(activities);
        });

        app.get('/chapter', async (req, res) => {
            const query = {};
            const chapter = await chapterCollection.find(query).toArray();
            res.send(chapter);
        });

        // app.get('/teacherChapter', async (req, res) => {
        //     const query = {};
        //     const chapter = await teacherChapterCollection.find(query).toArray();
        //     res.send(chapter);
        // });

        app.get('/class-material', async (req, res) => {
            const query = {};
            const classMaterial = await classMaterialCollection.find(query).toArray();
            res.send(classMaterial);
        });

        app.get('/group-activities', async (req, res) => {
            const query = {};
            const groupActivities = await groupActivitiesCollection.find(query).toArray();
            res.send(groupActivities);
        });

        app.get('/repository', async (req, res) => {
            const query = {};
            const repository = await repositoryCollection.find(query).toArray();
            res.send(repository);
        });

        app.get('/resources', async (req, res) => {
            const query = {};
            const resources = await resourcesCollection.find(query).toArray();
            res.send(resources);
        });

        app.get('/single-activities', async (req, res) => {
            const query = {};
            const singleActivities = await singleActivitiesCollection.find(query).toArray();
            res.send(singleActivities);
        });

       


        app.post('/activities',  async(req, res) => {
            const activity = req.body;
            const result = await activitiesCollection.insertOne(activity);
            res.send(result);
        });

        app.post('/chapter',  async(req, res) => {
            const chapter = req.body;
            const result = await chapterCollection.insertOne(chapter);
            res.send(result);
        });
        app.post('/class-material',  async(req, res) => {
            const classMaterial = req.body;
            const result = await classMaterialCollection.insertOne(classMaterial);
            res.send(result);
        });
        app.post('/group-activities',  async(req, res) => {
            const groupActivities = req.body;
            const result = await groupActivitiesCollection.insertOne(groupActivities);
            res.send(result);
        });
        app.post('/repository',  async(req, res) => {
            const repository = req.body;
            const result = await repositoryCollection.insertOne(repository);
            res.send(result);
        });
        app.post('/resources',  async(req, res) => {
            const resources = req.body;
            const result = await resourcesCollection.insertOne(resources);
            res.send(result);
        });
        app.post('/single-activities',  async(req, res) => {
            const singleActivities = req.body;
            const result = await singleActivitiesCollection.insertOne(singleActivities);
            res.send(result);
        });











        app.get('/activities/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const activities = await activitiesCollection.findOne(query);
            res.send(activities);
        });
       
        
        app.put('/activities/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const number = req.body.number;
            const comments = req.body.comments;
            const option = {upsert: true};
            const update = {
                $set: {
                    number: number,
                    comments: comments
                }
            }
            
            const result = await activitiesCollection.updateOne(filter, update, option);
            res.send(result);
        })  



        app.put('/activitiesStudent/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const number = Math.floor(Math.random() * 6) + 5;
            const answer = req.body.answer;
            const option = {upsert: true};
            const update = {
                $set: {
                    number: number,
                    answer: answer
                }
            }
            
            const result = await activitiesCollection.updateOne(filter, update, option);
            res.send(result);
        })  


        app.get('/repository/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await repositoryCollection.findOne(query);
            res.send(result);
        })

        app.put('/repository/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const answer = req.body.answer;
            const option = {upsert: true};
            const updateAnswer = {
                $set: {
                    answer: answer
                }
            }
            const result = await repositoryCollection.updateOne(filter, updateAnswer, option);
            res.send(result);
        })  



        app.get('/amarjiggasa', async (req, res) => {
            const query = {};
            const amarJiggasa = await amarJiggasaCollection.find(query).toArray();
            res.send(amarJiggasa);
        });

        app.get('/amarjiggasa/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const amarjiggasa = await amarJiggasaCollection.findOne(query);
            res.send(amarjiggasa);
        });


        app.put('/amarjiggasa/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const answer = req.body.answer;
            const option = {upsert: true};
            const updateAnswer = {
                $set: {
                    answer: answer
                }
            }
            const result = await amarJiggasaCollection.updateOne(filter, updateAnswer, option);
            res.send(result);
        }) 










    }



    finally {

    }
}

run().catch(console.log)


// app.get('/', async (req, res) => {
//     res.send('Smart Education server is running');
// })

app.listen(port, () => console.log(`Smart Education running on ${port}`))