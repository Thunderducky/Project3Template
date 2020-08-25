import React from "react"
import {Button, Input } from "reactstrap"


export function SearchBar(props) {
    return (
    
        <Input className="form-control m-auto" {...props}  style={{ width:"50%", height:"50px",  borderRadius: "20px"}}/>
    );
  }

  export function FormBtn(props) {
    return (
      <Button {...props} style={{ fontSize: "20px" }} className="btn btn-success m-auto ">
        {props.children}
      </Button>
    );
  }
