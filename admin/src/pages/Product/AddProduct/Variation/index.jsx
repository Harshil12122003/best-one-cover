import Input from "components/atoms/Input";
import React, { useState } from "react";
import styles from "./Variation.module.scss";
import RemoveIcon from "@mui/icons-material/Remove";
import BaseButton from "components/atoms/Button";

const Variation = () => {
  const [variationField, setVariationField] = useState([]);

  const handleChangeVariant = (index, event) => {
    console.log("index", index);
    let data = [...variationField];
    data[index][event.target.name] = event.target.value;
    setVariationField(data);
  };

  const handlerAddField = () => {
    let newField = { variant: "", price: "", stockUnit: "" };
    setVariationField([...variationField, newField]);
  };
  const handleremoveVariant = (index) => {
    let oldField = [...variationField];
    oldField.splice(index, 1);
    setVariationField(oldField);
  };

  console.log("variationField", variationField);

  return (
    <div className={styles.variation}>
      <h3>Variation</h3>
      <p>
        Add a custome variat options for your product, like different sizes or
        colors.
      </p>
      <form className={styles.variationWrapper}>
        <div className={styles.addVariaton}>
          <div className={styles.variantField}>
            {variationField.map((input, index) => {
              return (
                <div key={index} className={styles.variantList}>
                  <Input
                    variant="outlined"
                    name="variant"
                    label="Variant"
                    required
                    value={input.variant}
                    onChange={(event) => handleChangeVariant(index, event)}
                    // error={error.email ? true : false}
                    // helperText={error.email}
                  />
                  <Input
                    variant="outlined"
                    name="price"
                    label="Price"
                    required
                    value={input.price}
                    onChange={(event) => handleChangeVariant(index, event)}
                    // error={error.email ? true : false}
                    // helperText={error.email}
                  />
                  <Input
                    variant="outlined"
                    name="stockunit"
                    label="Stock Kepping Unit"
                    required
                    value={input.stockUnit}
                    onChange={(event) => handleChangeVariant(index, event)}
                    // error={error.email ? true : false}
                    // helperText={error.email}
                  />
                  <div
                    className={styles.removeVariant}
                    onClick={() => handleremoveVariant(index)}
                  >
                    <RemoveIcon />
                  </div>
                </div>
              );
            })}
          </div>

          <button className={styles.addField} onClick={handlerAddField}>
            + add field
          </button>
        </div>
        <div className={styles.productBtn}>
          <div className={styles.productBtnWrapper}>
            <BaseButton variant="outlined">cancel</BaseButton>
            <BaseButton variant="contained">add variant</BaseButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Variation;
