import { combineReducers } from "redux";
import posts from "./posts";
import common from "./common";
import postDetails from "./postDetails";
import userAdd from "./userAdd";

export default combineReducers({ 
    posts,
    common,
    postDetails,
    userAdd
 });
