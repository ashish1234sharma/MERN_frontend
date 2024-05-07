import React, { Fragment, useRef, useState, } from 'react'
import { Paper, Box, Stack, Typography, CircularProgress, Grid, } from '@mui/material';
import FormData from 'form-data'
import { UploadImage } from '../../assets/svg';
import { enqueueSnackbar } from 'notistack';
import SnackNotification from '../snackbar';
import { productimageupload } from '../../services';

const ThumbnailsPicker = ({ thumbnails = [], onThumbnails = () => { } }) => {
    const inputRef = useRef()
    const [isLoading, setIsLoading] = useState(false)

    const onChangeFile = function (e) {
        e.preventDefault();
        if (e?.target?.files?.length > 4) return enqueueSnackbar(
            "Upload only 4 image", {
            variant: "warning",
            content: (key, message) => { return SnackNotification(key, message, 'warning') }
        })

        if (e?.target?.files && e?.target?.files?.length) {
            let reader = new FileReader();
            let files = e?.target?.files;
            reader.onloadend = () => {
                setIsLoading(true)
                const formdata = new FormData();
                for (let i = 0; i < files?.length; i++) {
                    formdata.append(`thumbnails`, files[i]);
                }
                productimageupload(formdata)
                    .then((response) => {
                        if (response.status === 200) {
                            console.log(response?.data)
                            onThumbnails(response?.data?.thumbnails)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            }
            reader.readAsDataURL(files[0])
        }
    };
    const onDropFile = function (e) {
        e.preventDefault();
        e?.stopPropagation();
        if (e?.dataTransfer?.files?.length > 4) return enqueueSnackbar(
            "Upload only 4 image", {
            variant: "warning",
            content: (key, message) => { return SnackNotification(key, message, 'warning') }
        })

        if (e?.dataTransfer?.files && e?.dataTransfer?.files?.length) {
            let reader = new FileReader();
            let files = e?.dataTransfer?.files;
            reader.onloadend = () => {
                setIsLoading(true)
                const formdata = new FormData();
                for (let i = 0; i < files?.length; i++) {
                    formdata.append(`thumbnails`, files[i]);
                }
                productimageupload(formdata)
                    .then((response) => {
                        if (response.status === 200) {
                            console.log(response?.data)
                            onThumbnails(response?.data?.thumbnails)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            }
            reader.readAsDataURL(files[0])
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <Fragment>
            <Stack spacing={2}>
                <Box sx={{ width: "100%", }}>
                    {isLoading ?
                        <Box sx={{ height: '350px', display: "flex", justifyContent: 'center', alignItems: 'center', backgroundSize: "cover", borderRadius: "16px", border: "1px dashed rgba(145, 158, 171, 0.2)", cursor: "pointer", outline: "none", overflow: "hidden", backgroundColor: "rgba(145, 158, 171, 0.08)", transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" }}>
                            <CircularProgress />
                        </Box>
                        :
                        <Box
                            onDrop={(event) => onDropFile(event)}
                            onDragOver={(e) => handleDragOver(e)}
                            onClick={() => inputRef?.current?.click()} role="presentation" sx={{ height: '350px', display: "flex", justifyContent: 'center', alignItems: 'center', backgroundSize: "cover", borderRadius: "16px", border: "1px dashed rgba(145, 158, 171, 0.2)", cursor: "pointer", outline: "none", padding: "40px", overflow: "hidden", backgroundColor: "rgba(145, 158, 171, 0.08)", transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" }}>
                            <input ref={inputRef} tabIndex="-1" onChange={(event) => onChangeFile(event)} accept="image/*" type="file" multiple style={{ display: "none" }} />
                            {!thumbnails?.length ?
                                <Stack spacing={2}>
                                    <UploadImage />
                                    <Stack spacing={1}>
                                        <Typography sx={{ fontSize: "18px", color: "#212B36", fontWeight: 700, textAlign: "center" }}>Drop or Select file</Typography>
                                        <Box sx={{ gap: "8px", display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                                            <Typography sx={{ color: "#637381", fontSize: "14px", fontWeight: 400, textAlign: 'center' }}>Drop files here or click <span style={{ color: "#00a76f", fontSize: "14px", fontWeight: 400, textDecoration: "underline" }}>browse</span> thorough your machine</Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                                :
                                <Grid container spacing={1}>
                                    {thumbnails.map((value, index) => {
                                        return (
                                            <Grid key={index} item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <img src={value} alt="prevImage" style={{ width: "100%", height: "100%", borderRadius: "16px" }} />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            }
                        </Box>
                    }
                </Box>
            </Stack>
        </Fragment>
    )
}

export default ThumbnailsPicker
