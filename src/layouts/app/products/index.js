import React, { Fragment, useEffect, useState } from 'react'
import { Box, IconButton, Paper, Typography, useTheme } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom"
import { allproducts } from '../../../services'
import SkeletonLoader from '../../../components/skeletonloader';
import ProductDelete from '../../../components/productdelete';

const Products = () => {
    const Navigate = useNavigate()
    const { palette: { primary } } = useTheme()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [getProducts, setGetProducts] = useState([])
    const [isLoading, setIsloading] = useState(true);
    const [isDelete, setIsDelete,] = useState(null);
    const [pageSummaru, setPageSummary] = useState({
        currentPage: 0,
        totalPage: 0,
        numberOfData: 0,
    });

    const getAllProducts = async () => {
        await allproducts(`currentPage=${queryParams.get("currentPage")}&pageSize=${queryParams.get("pageSize")}`)
            .then((response) => {
                if (response.status === 200) {
                    setGetProducts(response?.data?.data)
                    setPageSummary((state) => ({
                        ...state,
                        currentPage: response?.data?.currentPage,
                        totalPage: response?.data?.totalPage,
                        numberOfData: response?.data?.numberOfData,
                    }))
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => { setIsloading(false) })
    };

    useEffect(() => {
        getAllProducts()
    }, [isDelete]);



    return (
        <Fragment>
            {isLoading ?
                <Fragment>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: 450 }}>
                        {Array.from({ length: 10 }).map((_, index) => {
                            return (
                                <Box key={index}>
                                    <SkeletonLoader />
                                </Box>
                            )
                        })}
                    </Box>
                </Fragment>
                :
                !getProducts.length ?
                    <Fragment>
                        <Paper sx={{ maxWidth: 450 }}>
                            <Typography variant='h6' textAlign={"center"}>Products not available</Typography>
                        </Paper>
                    </Fragment>
                    :
                    <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      minWidth: "100%",
                      flexWrap: "wrap",
                      padding:'10px'
                    }}
                  >
                    {getProducts.map((value, index) => {
                      return (
                        <Paper
                          key={index}
                          sx={{
                            width: {
                              xs: "100%",
                              sm: "48%",
                              md: "48%",
                              lg: "30%",
                              xl: "30%",
                            },
                            cursor:'pointer'
                          }}
                          onClick={() => {
                              Navigate(`/admin/product/detail?product=${value?._id}`);
                            }}
                        >
                          <img
                            src={value?.thumbnails[0] }
                            alt="book img"
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "contain",
                            }}
                          />
                          <div>
                            <Typography
                              variant="h5"
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
                              {value?.title}
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
                              {value?.description}
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
                              {value?.authour}
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
                              Rs {value?.sale_price} /-
                            </Typography>
                          </div>
          
                        </Paper>
                      );
                    })}
                  </Box>
            }
        </Fragment>
    )
}

export default Products
