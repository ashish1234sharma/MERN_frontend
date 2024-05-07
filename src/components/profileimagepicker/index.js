import React, { Fragment, useState } from 'react'
import { Typography, useTheme, Box, Paper, } from '@mui/material'
import ImagePicker from './ImagePicker'
import { profileimageupload } from '../../services'
import FormData from 'form-data'

const ProfileImagePicker = ({ profileImage, onImage }) => {
    const { palette: { text } } = useTheme();
    const [prevImage, setPrevImage] = useState(profileImage);
    const [value, setValue] = useState({ image: null });

    const handleDrop = function (e) {
        e?.preventDefault();
        e?.stopPropagation();
        if (e?.dataTransfer?.files && e?.dataTransfer?.files[0]) {
            let reader = new FileReader();
            let file = e?.dataTransfer?.files[0];
            reader.onloadend = () => {
                setValue({ ...value, image: file });
                setPrevImage(URL.createObjectURL(file));
                const fromdata = new FormData()
                fromdata.append("profileImg", file)
                profileimageupload(fromdata)
                    .then((response) => {
                        if (response?.status === 200) {
                            onImage(response?.data?.url)
                        }
                    })
                    .catch((error) => { console.log(error) })
                    .finally(() => { })
            }
            reader.readAsDataURL(file)
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <Fragment>
            <Paper
                onDrop={(event) => handleDrop(event)}
                onDragOver={(e) => handleDragOver(e)}
                sx={{ padding: "20px", maxWidth: "450px", margin: "0 auto", marginTop: 2 }}>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ImagePicker onImage={onImage} prevImage={prevImage || profileImage} setPrevImage={setPrevImage} value={value} setValue={setValue} />
                </Box>
                <Typography variant='h6' sx={{ textAlign: "center", pt: 1.5 }}>Drop or Select file</Typography>
                <Typography variant='subtitle1' sx={{ pt: 1, textAlign: "center" }}>Drop files here or click <span style={{ color: "#00a76f", textAlign: "center", fontSize: "14px", fontWeight: 400, textDecoration: "underline" }}>browse</span> thorough your machine</Typography>
            </Paper>
        </Fragment>
    )
}

export default ProfileImagePicker
