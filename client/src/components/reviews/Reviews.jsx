import React from "react";
import onePluse3 from "assets/images/oneplus3.jpg";
import user from "assets/images/user (2).png";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: "100%",
          mr: 1,
          color: props.color ? props.color : "primary",
        }}
      >
        <LinearProgress
          variant="determinate"
          {...props}
          color="inherit"
          sx={{ height: 6, borderRadius: 2 }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}`}</Typography>
      </Box>
    </Box>
  );
}

function Reviews({ totalRatings, reviews, ratings }) {
  return (
    <>
      <div className="ratings-reviews mt-5">
        <h4 className="my-3">Ratings & Reviews</h4>
        <div className="ratings">
          <div className="row">
            <div className="left-ratings col-lg-2 d-flex flex-column align-items-center justify-content-center">
              <h2>{totalRatings} ★</h2>
              <span className="text-muted text-center">{reviews?.length} Ratings <br />&</span>
              <span className="text-muted">{reviews?.length} Reviews</span>
            </div>

            <div className="right-ratings col-lg-10">
              <ul className="m-0">
                <li>
                  <div className="me-3">5 ★</div>
                  <div className="w-50">
                    <LinearProgressWithLabel
                      value={ratings[4]}
                      color={"#28A745"}
                    />
                  </div>
                  {/* <div className="me-3">5 ★</div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "250px" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-3">{ratings[4]}</span> */}
                </li>
                <li>
                  <div className="me-3">4 ★</div>
                  <div className="w-50">
                    <LinearProgressWithLabel
                      value={ratings[3]}
                      color="#28A745"
                    />
                  </div>
                  {/* <span className="me-3">4 ★</span>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "250px" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-3">{ratings[3]}</span> */}
                </li>
                <li>
                  <div className="me-3">3 ★</div>
                  <div className="w-50">
                    <LinearProgressWithLabel
                      value={ratings[2]}
                      color="#28A745"
                    />
                  </div>
                  {/* <span className="me-3">3 ★</span>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "250px" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-3">{ratings[2]}</span> */}
                </li>
                <li>
                  <div className="me-3">2 ★</div>
                  <div className="w-50">
                    <LinearProgressWithLabel
                      value={ratings[1]}
                      color="#FFC107"
                    />
                  </div>
                  {/* <div className="progress">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{width: "250px"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <span className="ms-3">{ratings[1]}</span> */}
                </li>
                <li>
                  <div className="me-3">1 ★</div>
                  <div className="w-50">
                    <LinearProgressWithLabel
                      value={ratings[0]}
                      color="#DC3545"
                    />
                  </div>
                  {/* <span className="me-3">1 ★</span>
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "250px" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-3">{ratings[0]}</span> */}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="reviews">
          {reviews?.length > 0 &&
            reviews?.map((review) => {
              return <div className="review">
                <div className="top d-flex align-items-center">
                  <img src={review?.user?.image?.url ? review?.user?.image?.url : user } alt="" />
                  <h6 className="m-0 text-capitalize">{review?.user?.fname + " " + review?.user?.lname}</h6>
                </div>

                <div className="bottom">
                  {/* <span>★ ★ ★ ★ ★</span> */}
                  <Rating name="read-only" size="small" value={review?.rating} readOnly sx={{mt:1}} />
                  <p>Reviewed in India 🇮🇳 on {new Date(review?.createdAt).toDateString()}</p>
                  <p style={{ textAlign: 'justify' }}>
                   {review?.review}
                  </p>
                </div>
              </div>;
            })}

          {/* <div className="review">
            <div className="top d-flex align-items-center">
              <img src={onePluse3} alt="" />
              <h6 className="m-0">Utsav Mavani</h6>
            </div>

            <div className="bottom">
              <span>★ ★ ★ ★ ★</span>
              <p>Reviewed in India 🇮🇳 on 7 December 2022</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Perspiciatis enim maiores illo molestias, ex nihil nostrum.
                Soluta alias dolorem labore facilis, et delectus tempore.
              </p>
            </div>
          </div>

          <div className="review">
            <div className="top d-flex align-items-center">
              <img src={onePluse3} alt="" />
              <h6 className="m-0">Kenil Chovatiya</h6>
            </div>

            <div className="bottom">
              <span>★ ★ ★ ★ ★</span>
              <p>Reviewed in India 🇮🇳 on 7 December 2022</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Perspiciatis enim maiores illo molestias, ex nihil nostrum.
                Soluta alias dolorem labore facilis, et delectus tempore.
              </p>
            </div>
          </div>

          <div className="review">
            <div className="top d-flex align-items-center">
              <img src={onePluse3} alt="" />
              <h6 className="m-0">Dhruvil Mangukiya</h6>
            </div>

            <div className="bottom">
              <span>★ ★ ★ ★ ★</span>
              <p>Reviewed in India 🇮🇳 on 7 December 2022</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Perspiciatis enim maiores illo molestias, ex nihil nostrum.
                Soluta alias dolorem labore facilis, et delectus tempore.
              </p>
            </div>
          </div> */}

          {/* <a href="" className="all-reviews">
            {reviews.length <=0 ? "No Reviews " : "See All Reviews"}
          </a> */}
        </div>
      </div>
    </>
  );
}

export default Reviews;
