import React from "react"
import {Button, Input, FormGroup } from "reactstrap"


export function SearchBar(props) {
    return (
      <FormGroup>
        <Input className="form-control" {...props} />
      </FormGroup>
    );
  }
  

  export function FormBtn(props) {
    return (
      <Button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
        {props.children}
      </Button>
    );
  }
