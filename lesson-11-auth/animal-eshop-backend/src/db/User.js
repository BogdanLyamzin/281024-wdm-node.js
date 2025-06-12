import { DataTypes } from "sequelize";

import sequalize from "./sequelize.js";

const User = sequalize.define("user", {
  email: {
    type: DataTypes.STRING,
    unique: {
        args: true,
        msg: "user/manager/admin with with email already exist"
    },
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: "email mast contain @ and no contain spaces",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
    allowNull: false,
    validate: {
      isIn: {
        args: [["admin", "manager", "user"]],
        msg: "Role can be only admin, manager or user",
      },
    },
  },
});

// User.sync();

export default User;
