import React, { Fragment, useRef } from 'react'
import { AddPhotoAlternateRounded } from '@mui/icons-material'
import { Typography, useTheme, Box } from '@mui/material'
import { profileimageupload } from '../../services'
import FormData from 'form-data'

const ImagePicker = ({ onImage, setValue, value, prevImage, setPrevImage }) => {
    const inputRef = useRef()
    const { palette: { divider, grey } } = useTheme();

    const handleChange = function (e) {
        e.preventDefault();
        if (e?.target?.files && e?.target?.files[0]) {
            let reader = new FileReader();
            let file = e?.target?.files[0];
            reader.onloadend = () => {
                console.log(e?.target?.files)
                setValue({ ...value, image: file })
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

    return (
        <Fragment>
            <Box onClick={() => inputRef?.current?.click()} sx={{ width: "130px", height: "130px", backgroundColor: grey[200], cursor: "pointer", borderRadius: `${130 / 2}px`, border: `1.5px dashed ${divider}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <input ref={inputRef} tabIndex="-1" onChange={(event) => handleChange(event)} accept="image/*" type="file" style={{ display: "none" }} />
                {prevImage !== null ?
                    <img src={prevImage} alt='' style={{ width: "100%", height: "100%", borderRadius: `${130 / 2}px` }} />
                    :
                    <Fragment>
                        <AddPhotoAlternateRounded />
                        <Typography variant="subtitle1" sx={{ userSelect: "none", pt: .5, pb: .5 }}>Upload</Typography>
                    </Fragment>
                }
            </Box>
        </Fragment>
    )
}

ImagePicker.defaultProps = {
    prevImage: null,
    setPrevImage: () => { },
    setValue: () => { },
    onImage: () => { },
    value: {}
}

export default ImagePicker