import * as user from "./user";

user.createUser(process.env.TABLE_NAME, JSON.parse(process.env.USER));
