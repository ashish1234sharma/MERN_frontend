import React, { Fragment, useEffect, useState } from "react";
import { Box, IconButton, OutlinedInput, Paper, Typography, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { allproducts } from "../../../services";
import SkeletonLoader from "../../../components/skeletonloader";
import ProductDelete from "../../../components/productdelete";
import { useSelector } from "react-redux";

const Products = () => {
  const Navigate = useNavigate();
  const {
    palette: { primary },
  } = useTheme();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [getProducts, setGetProducts] = useState([]);
  const [elasticsearch, setElasticSearch] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isDelete, setIsDelete] = useState(null);
  const { currentUser } = useSelector((state) => state?.authhelper)
  const [input, setInput]=useState({search:""})
  const [pageSummaru, setPageSummary] = useState({
    currentPage: 0,
    totalPage: 0,
    numberOfData: 0,
  });
  console.log(input)

  const handleInput=(e)=> {
      const {id,value}=e.target
      setInput({
        ...input,
        [id]:value
      })
       
    }
    useEffect(()=>{
        handleFilter()
    },[input.search])
  


  const getAllProducts = async () => {
    await allproducts(
      `currentPage=${queryParams.get("currentPage")}&pageSize=${queryParams.get(
        "pageSize"
      )}`
    )
      .then((response) => {
        if (response.status === 200) {
          setGetProducts(response?.data?.data);
          setElasticSearch(response?.data?.data)
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
    getAllProducts();
  }, [isDelete]);
  
  const handleFilter=()=>{
    let filterdata=getProducts.filter((data) => {
        return (
            data
                .title
                .toLocaleLowerCase()
                .includes(input?.search.toLocaleLowerCase()) ||
            data
                .category
                .toString()
                .includes(input?.search.toLocaleLowerCase()) ||
                data
                .authour
                .toString()
                .includes(input?.search.toLocaleLowerCase())
        )
    })
    if(input.search == ''){
        setGetProducts(elasticsearch)
      }else{
        setGetProducts(filterdata)
      }
   console.log(getProducts)
  }

 

  return (
    <Fragment>
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
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            minWidth: "100%",
            flexWrap: "wrap",
            padding: "10px",
          }}
        >
            <Box sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                <OutlinedInput placeholder="Search" value={input.search} id='search' sx={{width:{xs:'100%',sm:'100%',md:'30%',lg:'30%',xl:'30%'}}} onChange={(e)=>handleInput(e)} />
            </Box>
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  Navigate(`/admin/product/detail?product=${value?._id}`);
                }}
              >
                <img
                  src={value?.thumbnails[0]}
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
                    {value?.category}
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
                {currentUser.user_type === "admin" && (
                  <>
                    <ProductDelete
                      isRedirect={false}
                      _id={value?._id}
                      isDelete={isDelete}
                      setIsDelete={setIsDelete}
                    />
                  </>
                )}
              </Paper>
            );
          })}
        </Box>
      )}
    </Fragment>
  );
};

export default Products;
