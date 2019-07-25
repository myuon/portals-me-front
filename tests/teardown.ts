import * as user from "./user";

user.deleteUser(process.env.TABLE_NAME, JSON.parse(process.env.USER));
