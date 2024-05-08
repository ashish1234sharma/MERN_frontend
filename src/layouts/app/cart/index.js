import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import SkeletonLoader from "../../../components/skeletonloader";
import { ArrowBackRounded } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { checkout_items } from "../../../services";
import { useSelector } from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  };

const Cart = () => {
  const Navigate = useNavigate();
  const [list,setList]=useState([])
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useSelector((state) => state?.authhelper)
  console.log('currentUser',currentUser._id)
  const {
    palette: { primary, text },
  } = useTheme();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const OrderPlaced = async () => {
    const data={amount:100}
    await checkout_items(currentUser._id,data)
      .then((response) => {
        if (response.status === 200) {
        //   setGetCheckouts(response?.data?.data);
        console.log("cart",response.data)
        handleOpen()
        setTimeout(()=>{
            Navigate('/admin/dashboard')
           },3000)

        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // setIsloading(false);
      });
  };
  useEffect(()=>{
    setList(arr)
  },[])

  const handleDelete=(id)=>{
   let newList = list.filter((e)=>e !== id) 
   setList(newList)
  }


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
      <Box
        sx={{
          width: "100%",
          marginTop: "20px",
          display: "flex",
          alignItems:'center',
          justifyContent: "flex-end",
          gap:'20px'
        }}
      >
           <Button variant="contained" onClick={OrderPlaced}>Place Order</Button>
        <Typography variant="h4">Total :- Rs 100 /-</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100%",
          marginTop: "20px",
        }}
      >
        {list.map((e, i) => {
          return (
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                borderRadius: "5px",
              }}
            >
              <Box sx={{ width: "40%" }}>
                <Typography variant="h5">{e}</Typography>
                <Typography sx={{ marginTop: "10px" }}>Category</Typography>
              </Box>
              <Typography sx={{ fontWeight: "bold" }}>X</Typography>
              <Box
                sx={{
                  width: "20%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                  1
                </Typography>
                  <DeleteIcon sx={{ color: "black",cursor:'pointer' }} onClick={()=>handleDelete(e)} />
              </Box>
            </Paper>
          );
        })}

      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Order Placed Successfully !!!
          </Typography>

        </Box>
      </Modal>
    </Fragment>
  );
};
export default Cart;
