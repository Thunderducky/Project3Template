import React from "react"
import { useStoreContext } from '../utils/GlobalStore';
import NavTab from "../components/NavTabs";
function Members(){
    const [state] = useStoreContext();
    const {email} = state;
    return( 
    <div>
      <NavTab/>
      <div className="container">
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <h2>Welcome {email}</h2>
      </div>
    </div>
  </div>
  </div>
    );
}

export default Members;