
const connectDatabase = async()=> {
    try {
        await sequelize.authenticate(); 
        console.log("Successfully connect database");
    }
    catch(error) {
        console.log("Error connect database");
        console.log(error);
    }
}

export default connectDatabase;