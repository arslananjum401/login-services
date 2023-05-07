import { connect } from "mongoose";

connect('mongodb+srv://arslananjum401:arslan12@myprojects.e5lwnsi.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch(Error => {
        console.error("Error connecting to MongoDB", Error)
    })