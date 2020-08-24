import React from "react"
import { useStoreContext } from '../utils/GlobalStore';
import Jumbotron from "../components/Jumbotron";
import SaveBtn from "../components/SaveBtn";
import GoogleAPI from "../utils/GoogleAPI";
import MongoAPI from "../utils/MongoAPI";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input} from "../components/Form";
import useDebounce from "../utils/debounceHook";
//import {NavContext} from "../../src/UserContext";

function Members(){
    const [state] = useStoreContext();
    const {email} = state;
    return( 
    <div>
      <div className="container">
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <h2>Welcome, {email}</h2>
      </div>
    </div>
  </div>
  </div>
    );
}

export default Members;