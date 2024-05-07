import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { productbyid } from "../../../services";
import SkeletonLoader from "../../../components/skeletonloader";
import ProductDelete from "../../../components/productdelete";

const ProductDetail = () => {
  const Navigate = useNavigate();
  const {
    palette: { primary, text },
  } = useTheme();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [getProduct, setGetProduct] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [isDelete, setIsDelete] = useState(null);

  useEffect(() => {
    (async () => {
      await productbyid(queryParams.get("product"))
        .then((response) => {
          if (response.status === 200) {
            setGetProduct(response?.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsloading(false);
        });
    })();
  }, []);

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={() => {
            Navigate(-1);
          }}
          sx={{ color: text.black }}
        >
          <ArrowBackRounded />
        </IconButton>
        <Typography variant="h5">Go Back</Typography>
      </Box>
      {isLoading ? (
        <Fragment>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              maxWidth: 450,
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <Box key={index}>
                  <SkeletonLoader />
                </Box>
              );
            })}
          </Box>
        </Fragment>
      ) : !getProduct ? (
        <Fragment>
          <Paper sx={{ maxWidth: 450 }}>
            <Typography variant="h6" textAlign={"center"}>
              Product not available
            </Typography>
          </Paper>
        </Fragment>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            width: "100%",
            marginTop: "50px",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "70%",
                lg: "70%",
                xl: "70%",
              },
              display: "flex",
              alignItems: "center",
              flexDirection: {
                xs: "column-reverse",
                sm: "column-reverse",
                md: "row",
                lg: "row",
                xl: "row",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "50%",
                  lg: "50%",
                  xl: "50%",
                },
              }}
            >
              <Box
                style={{
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    cursor: "pointer",
                    "&:hover": { color: primary.main },
                  }}
                >
                  {getProduct?.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {getProduct?.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {getProduct?.category}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {getProduct?.authour}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  Rs {getProduct?.sale_price} /-
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: "20px" }}
                  onClick={() => {
                    Navigate('/user/products/Cart');
                  }}
                >
                  Add to cart
                </Button>
                {/* {user_type !== "user" ? (
                            <>
                              <ProductDelete
                                isRedirect={false}
                                // _id={value?._id}
                                isDelete={isDelete}
                                setIsDelete={setIsDelete}
                              />
                            </>
                          ) : null} */}
              </Box>
            </Box>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "50%",
                  lg: "50%",
                  xl: "50%",
                },
              }}
            >
              <img
                src={getProduct?.thumbnails[0]}
                alt="book img"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default ProductDetail;
