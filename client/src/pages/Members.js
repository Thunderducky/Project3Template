import React from "react"
import { useStoreContext } from "../utils/GlobalStore";
import { SearchBar, FormBtn } from "../components/Form"

function Members(){
    const [state] = useStoreContext();
    const {email} = state;
  
  
  return( 
<div>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6 col-md-offset-3 mb-5">
        <h3>Welcome, {email}</h3>
      </div>
    </div>

    <div className="row mb-5">
      <div className="col-md-12">
      <h1 className="text-center"> Personal Movie Librarian</h1>
      <h3 className="text-center"> What can I help you?</h3>
      </div>
    </div>
  </div>
      <div className="row mb-5">
        <div className="col-md-12 pb-5 ">
         <SearchBar
          name="title"
          placeholder="search"/>
        </div>
        <FormBtn>
        Search For Movie
        </FormBtn>
      </div>
</div>
    );
}

export default Members;