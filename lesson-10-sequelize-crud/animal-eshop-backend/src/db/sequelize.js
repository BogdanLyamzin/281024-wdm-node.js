import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dialectOptions: {
        ssl: true
    }
});

export const connectDatabase = async()=> {
    try {
        await sequelize.authenticate(); 
        console.log("Successfully connect database");
    }
    catch(error) {
        console.log("Error connect database");
        console.log(error);
    }
}

export default sequelize;