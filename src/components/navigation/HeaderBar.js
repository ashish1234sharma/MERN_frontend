import React, { Fragment, useState } from "react";
import {
  AppBar,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  IconButton,
  TextField,
  OutlinedInput,
  Popper,
  Button,
  Fade,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import UserSection from "./UserSection";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";

const HeaderBar = ({ isOpen, setIsOpen }) => {
  const {
    breakpoints,
    palette: { common, text },
  } = useTheme();
  const mathUpMd = useMediaQuery(breakpoints?.up("lg"));
  const { currentUser = null } = useSelector((state) => state?.authhelper);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(null);
  const [placement, setPlacement] = useState();
  const [activeButton, setActiveButton] = useState(null); // State to track active button
  let AuthorData = ["Chetan Bhagat", "Manikant Singh", "Sachin Arora"];
  let Categories = ["Suspense", "Romantic", "Horror"];

  const handleClick = (newPlacement, id) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(id === activeButton ? !open : true); // Toggle the open state if the same button is clicked again
    setPlacement(newPlacement);
    setActiveButton(id); // Set active button
  };

 
  const handleAuthor=(author)=>{
       console.log(author)
       setOpen(null)
  }
  const handleCategory=(category)=>{
    console.log(category)
    setOpen(null)
}

  return (
    <Fragment>
      <AppBar
        elevation={0}
        sx={{
          width: `calc(100% - ${
            mathUpMd ? (isOpen ? "240px" : "60px") : "0px"
          })`,
          backgroundColor: common?.white,
          border: "none",
          height: 60,
          transition: "ease-in-out  0.2s",
          left: mathUpMd ? (isOpen ? 240 : 60) : 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <MenuOpenRoundedIcon
              fontSize="medium"
              sx={{
                color: text?.black,
                transition: "ease-in-out 0.4s",
                transform: `rotate(${isOpen ? "0deg" : "180deg"})`,
              }}
            />
          </IconButton>
          <Box sx={{ width: "30%", height: "40px" }}>
            <OutlinedInput
              fullWidth
              variant="outlined"
              placeholder="Search Books"
              sx={{ height:{xs:'80%',sm:'80%',md:'100%',lg:'100%',xl:'100%'} }}
            />
          </Box>
          <div>
            <Popper
              sx={{ zIndex: 1200 }}
              open={open && activeButton === 1} 
              anchorEl={anchorEl}
              placement={placement}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper  sx={{maxHeight:'300px'}}>
                    {AuthorData?.map((e, i) => {
                      return (
                        <Typography sx={{ p: 2, cursor: "pointer" }} onClick={()=>handleAuthor(e)}>
                          {e}
                        </Typography>
                      );
                    })}
                  </Paper>
                </Fade>
              )}
            </Popper>
            <Button sx={{fontSize:{xs:'12px',sm:'12px',md:'14px',lg:'15px',xl:'15px'}}} onClick={handleClick("bottom", 1)}>Author</Button>
          </div>
          <div>
            <Popper
              sx={{ zIndex: 1200 }}
              open={open && activeButton === 2} 
              anchorEl={anchorEl}
              placement={placement}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper sx={{maxHeight:'300px'}}>
                    {Categories.map((e,i)=>{
                        return(
                            <Typography sx={{ p: 2, cursor: "pointer" }} onClick={()=>handleCategory(e)}>
                            {e}
                          </Typography>
                        )
                    })}

                  </Paper>
                </Fade>
              )}
            </Popper>
            <Button sx={{fontSize:{xs:'12px',sm:'12px',md:'14px',lg:'15px',xl:'15px'}}} onClick={handleClick("bottom", 2)}>Categories</Button>
          </div>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <UserSection />
          </Box>
        </Box>
      </AppBar>
    </Fragment>
  );
};

HeaderBar.defaultProps = {
  isOpen: true,
  setIsOpen: () => {},
};

export default HeaderBar;
