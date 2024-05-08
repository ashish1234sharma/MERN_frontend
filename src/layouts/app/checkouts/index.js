import React, { Fragment, useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { allcheckouts } from "../../../services";
import SkeletonLoader from "../../../components/skeletonloader";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Checkouts = () => {
  const Navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [getCheckouts, setGetCheckouts] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [pageSummaru, setPageSummary] = useState({
    currentPage: 0,
    totalPage: 0,
    numberOfData: 0,
  });
  let arr = [1, 2];
  const getAllCheckouts = async () => {
    await allcheckouts(
      `currentPage=${queryParams.get("currentPage")}&pageSize=${queryParams.get(
        "pageSize"
      )}`
    )
      .then((response) => {
        if (response.status === 200) {
          setGetCheckouts(response?.data?.data);
          setPageSummary((state) => ({
            ...state,
            currentPage: response?.data?.currentPage,
            totalPage: response?.data?.totalPage,
            numberOfData: response?.data?.numberOfData,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  useEffect(() => {
    getAllCheckouts();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
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
      ) : !getCheckouts.length ? (
        <Fragment>
          <Paper sx={{ maxWidth: 450 }}>
            <Typography variant="h6" textAlign={"center"}>
              Checkouts not available
            </Typography>
          </Paper>
        </Fragment>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            maxWidth: 450,
          }}
        >
          {getCheckouts?.map((value, index) => {
            return (
              <Paper
                key={index}
                onClick={() => {
                  Navigate(
                    `/admin/product/checkout/detail?checkout=${value?._id}`
                  );
                }}
                sx={{ cursor: "pointer", display:'flex',alignItems:'center',justifyContent:'space-between' }}
              >
                <Box
                  sx={{ display: "flex", gap: "20px",flexDirection:'column', alignItems: "flex-start" }}
                >
                  <Typography variant="h5">Order Id -: {value?._id}</Typography>
                  <Typography variant="h5">Title -: {value?.product_id?.title}</Typography>
                </Box>
                <Box>
                  <ChevronRightIcon sx={{ color: "black" }} />
                </Box>
              </Paper>
            );
          })}
        </Box>
      )}
    </Fragment>
  );
};

export default Checkouts;
