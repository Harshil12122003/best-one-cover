import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router";

const BreadCrumb = (props) => {

  const [isActive , setIsActive] = useState(false)
  const [isActiveChild2 , setIsActiveChild2] = useState(false)

  const {
    parentElement,
    childLink,
    childElement,
    child2Element,
    child2Link,
    child3Element,
    child3Link,
  } = props;
  const navigate = useNavigate();

  const handleChild2 = (event) => {
    event.preventDefault();
    setIsActiveChild2(true)
    setIsActive(false)

    navigate(`${child2Link}`);
  };
  const handleChild3 = (event) => {
    event.preventDefault();
    // setIsActiveChild2(true)
    // setIsActive(false)

    navigate(`${child3Link}`);
  };
  const handleChild = (event) => {
    event.preventDefault();
    setIsActive(true)
    setIsActiveChild2(false)

    navigate(`${childLink}`);
  };
  const handleParent = (event) => {
    event.preventDefault();
    navigate("/");
  };


  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›" style={{cursor : "pointer"}}>
      <Link underline="hover" color="inherit" onClick={handleParent}>
        {parentElement}
      </Link>
      <Link underline="hover" color={!isActive ? "inherit" : "blue"} onClick={handleChild}>
        {childElement}
      </Link>
     { child2Element &&  <Link underline="hover" color={!isActiveChild2 ? "inherit" : "blue"} onClick={handleChild2}>
        {child2Element}
      </Link>}
      { child3Element &&  <Link underline="hover" color={!isActiveChild2 ? "inherit" : "blue"} onClick={handleChild3}>
        {child3Element}
      </Link>}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
