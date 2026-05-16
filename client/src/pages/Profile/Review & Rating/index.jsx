import React, { useEffect, useState } from "react";
import Review from "../../../assets/images/rating.png";
import styles from "./ReviewRating.module.scss";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import swal from "sweetalert";
import Typography from "@mui/material/Typography";
import { actions as reviewAction } from "redux/Review/action";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Rating,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { loaderAction } from "redux/Loader/action";

const ReviewRating = () => {
  const dispatch = useDispatch();
  const { myReviews } = useSelector((state) => state.review);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { networkProgressDialog } = useSelector((state) => state.loader);


  // console.log("networkProgressDialog", networkProgressDialog)

  const [productFeedback, setProductFeedback] = useState({
    feedbackId: "",
    rating: 0,
    review: "",
    product: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteReview = async (id) => {
    const willDelete = await swal({
      title: "Are you sure ?",
      text: "Are you sure that you want to delete this review ?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes, Delete It!"],
    });

    if (willDelete) {
      dispatch(reviewAction.deleteReview(id));
      swal(
        "Deleted!",
        "Your review has been deleted successfully.",
        "success"
      );
    }
  };
  
  const saveReview = () => {
    setModalOpen(false);
    dispatch(reviewAction.updateReview(productFeedback));
    setProductFeedback({
      feedbackId: "",
      product: "",
      rating: 0,
      review: "",
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // useEffect(() => {
  //   // dispatch(loaderAction.startLoader())
  //   dispatch(reviewAction.getMyReviews());
  // }, []);

  useEffect(() => {
    dispatch(reviewAction.getMyReviews());
  },[])

  return (
    <div className={styles.reviewRating}>
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewHeader}>reviews & rating</div>
        {myReviews && myReviews?.length <= 0 && (
          <>
            <div className={styles.reviewImage}>
              <img src={Review} alt="Review & Rating" />
            </div>
            <div className={styles.reviewDesc}>
              <h4>No Reviews & Ratings</h4>
              <p>You have not rated or reviewed any product yet!</p>
            </div>
          </>
        )}
        <div className="my-3">
          {myReviews &&
            myReviews?.length > 0 &&
            myReviews?.map((review) => {
              return (
                <>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', gap: "20px" }} key={review?._id}>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={review?.product?.images ? review?.product?.images[0]?.url : ""}
                        sx={{ width: 100, height: 100 }}
                        variant="rounded"
                      />
                      <Box className="text-start px-2">
                        <h6 style={{ textAlign: 'justify' }}>{review?.product?.name}</h6>
                        <p>
                          {review?.product?.brand} - {review?.product?.model}
                        </p>

                        <Box>
                          <Rating
                            name="read-only"
                            value={review.rating}
                            readOnly
                            precision={0.5}
                          />
                          <p style={{ textAlign: 'justify' }}>{review?.review}</p>
                        </Box>
                        <Box
                          onClick={() => {
                            setModalOpen(true);
                            setProductFeedback({
                              feedbackId: review?._id,
                              product: review?.product?._id,
                              rating: review?.rating,
                              review: review?.review,
                            });
                          }}
                        >
                          <p className="text-primary m-0 d-inline-block" style={{ cursor: "pointer" }}>Edit this review</p>
                        </Box>
                      </Box>
                    </div>

                    <Box>
                      <Box
                        onClick={() => handleDeleteReview(review?._id) }
                      >
                        <DeleteIcon className="text-danger" style={{ cursor: 'pointer' }} />
                      </Box>
                    </Box>
                  </Box>
                  <hr />
                </>
              );
            })}

          <Dialog
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
            fullWidth
          >
            <DialogTitle>Give Ratings and Review</DialogTitle>
            <DialogContent>
              <Rating
                name="half-rating"
                // defaultValue={2.5}
                value={productFeedback.rating}
                className="my-2"
                // precision={0.5}
                onChange={(event, newValue) => {
                  setProductFeedback({
                    ...productFeedback,
                    rating: newValue,
                  });
                }}
              />
              <DialogContentText>
                Give Reviews of this products
              </DialogContentText>
              <TextField
                id="outlined-basic"
                label="Give Reviews"
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                margin="dense"
                value={productFeedback.review}
                onChange={(e) => {
                  setProductFeedback({
                    ...productFeedback,
                    review: e.target.value,
                  });
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => saveReview()}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
        </div>
      {/* </div>) : (<Box sx={{ display: "grid", height: "calc(100vh - 102px)", width: "100%", placeItems: "center", }}>
        <CircularProgress />
      </Box>)} */}
    </div>
  );
};

export default ReviewRating;
