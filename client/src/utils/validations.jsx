export const regularExpression = RegExp(
  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
);
// export const regularExpressionMobile = RegExp(/^[6-9]{1}[0-9]{9}$/);
export const regularExpressionMobile = RegExp(/^[7-9][0-9]{9}$/);
export const regularExpressionPincode = RegExp(/^[0-9]{6}$/);
export const regularExpressionLocation = RegExp(/^[A-Za-z]{1,30}$/);
// export const regularExpressionFieldRequired = RegExp(/^[A-Za-z]$/);



export const validation = (error, variables) => {

  let checkValidation = false;
  const arrError = Object.values(error);
  const arrVariables = Object.values(variables);


  for (let i = 0; i < Object.values(variables).length; i++) {
    let val = arrVariables[i];
    if (val === null || val === "") {
      checkValidation = false;
      break;
    } else {
      checkValidation = true;
    }
  }

  for (let i = 0; i < Object.values(error).length; i++) {
    let val = arrError[i];
    if (val.length > 0) {
      checkValidation = false;
      break;
    } else {
      checkValidation = true;
    }
  }
  // Object.values(variables).forEach((val) => {
  //   if (val === null || val === "") {
  //     checkValidation = false;
  //     break;
  //   } else {
  //     checkValidation = true;
  //   }
  // });

  // Object.values(error).forEach((val) => {
  //   if (val.length <= 0 || val === "" || val === null) {
  //     checkValidation = false;
  //     break;
  //   } else {
  //     checkValidation = true;
  //   }
  // });

  return checkValidation;
};

export const fieldValidation = (error, name, value) => {
  switch (name) {
    case "fname":
    case "name":
    case "lname":
      error[name] = value.length < 2 ? "Name should be 2 characters long" : "";
      break;
    case "email":
      error.email = regularExpression.test(value) ? "" : "Email is not valid";
      break;
    case "message":
    case "address":
      error[name] = value.length === 0 ? <p style={{ textTransform: "capitalize" }}>{name} is required</p> : ""
      break;
    case "pincode":
      error.pincode = value.length === 0 ? <p style={{ textTransform: "capitalize" }}>{name} is required</p> : regularExpressionPincode.test(value)
        ? ""
        : "Pincode is not valid";
      break;
    case "mobile":
      error.mobile = value.length === 0 ? <p style={{ textTransform: "capitalize" }}>{name} is required</p> : regularExpressionMobile.test(value)
        ? ""
        : "Mobile is not valid";
      break;
    case "locality":
    case "city":
    case "state":
      error[name] = value.length === 0 ? <p style={{ textTransform: "capitalize" }}>{name} is required</p> : regularExpressionLocation.test(value) ? "" : `Please enter valid ${name}`
      break
    case "password":
    case 'oldPassword':
    case "cpassword":
    case "newPassword":
      error[name] = value.length < 5 ? "Password should 5 characters long" : "";
      break;
    default:
      break;
  }

  return { name, value, error };
};

//   case "password":
//         error.password =
//           value.length < 5 ? "Password should 5 characters long" : "";
//       case "cpassword":
//         error.cpassword =
//           value.length < 5 ? "Password should 5 characters long" : "";
//         error.cpassword !== error.password
//           ? "The password and its confirm are not the same"
//           : " ";
//         break;
