import { combineReducers } from "redux";
import posts from "./posts";
import common from "./common";
import postDetails from "./postDetails";
import userAdd from "./userAdd";
import postAdd from "./postAdd";
import albums from "./albums";

export default combineReducers({ 
    posts,
    common,
    postDetails,
    userAdd,
    postAdd,
    albums
 });
