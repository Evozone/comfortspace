import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';

import { light, richBlack, deepDark, dark } from '../utils/colors';

interface MessageInputProps {
    inputRef: any;
    mode: string;
    handleSendMessage: (text: string) => void;
    uploadFile: (file: File) => void;
    textfieldOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
    handleSendMessage,
    inputRef,
    mode,
    uploadFile,
    textfieldOnChange,
}) => {
    const [imageModal, setImageModal] = useState<boolean>(false);
    const [imgLocalURL, setImgLocalURL] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileExt = file?.name.split('.').pop();
            if (
                fileExt === 'jpg' ||
                fileExt === 'jpeg' ||
                fileExt === 'png' ||
                fileExt === 'gif'
            ) {
                const localUrl = URL.createObjectURL(file);
                setImgLocalURL(localUrl);
                setImageFile(file);
                setImageModal(true);
                event.target.value = '';
            } else {
                alert('Please upload a valid image file of type jpg, jpeg, png or gif');
            }
        }
    };

    const handleCloseImgModal = () => {
        setImageModal(false);
        setImgLocalURL('');
        setImageFile(null);
    };

    const handleSendImage = () => {
        if (!imageFile) {
            alert('Please upload a valid image file of type jpg, jpeg, png or gif');
            return;
        }
        uploadFile(imageFile);
        handleCloseImgModal();
    };

    const handleKey = (event: React.KeyboardEvent) => {
        const text = inputRef?.current?.value;
        event.code === 'Enter' && event.ctrlKey && handleSendMessage(text);
    };

    const handleSendMsg = () => {
        const text = inputRef?.current?.value;
        handleSendMessage(text);
    };

    return (
        <Box
            sx={{
                position: 'sticky',
                bottom: '0',
            }}
        >
            <Modal
                open={imageModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: '80%',
                        height: 'auto',
                        maxHeight: '460px',
                        backgroundColor: mode === 'dark' ? '#101010' : '#f0f0f0',
                        boxShadow: 24,
                        borderRadius: '10px',
                        p: 2,
                        pb: 1,
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <CancelIcon
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                        cursor="pointer"
                        onClick={handleCloseImgModal}
                    />
                    <img
                        style={{
                            objectFit: 'contain',
                            height: '100%',
                            maxHeight: '400px',
                            display: 'block',
                        }}
                        alt="loading ..."
                        src={imgLocalURL}
                    />
                    <Divider sx={{ mt: '2px', width: '100%' }} />
                    <IconButton onClick={handleSendImage} sx={{ alignSelf: 'flex-end' }}>
                        <Tooltip title="Send Image">
                            <SendIcon
                                sx={{
                                    fontSize: '33px',
                                    color: deepDark,
                                }}
                            />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Modal>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: mode === 'light' ? light : richBlack,
                    p: 1,
                }}
            >
                <TextField
                    inputRef={inputRef}
                    sx={{
                        width: '100%',
                        border: 'none',
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'dark' ? '#101010' : '#f0f0f0',
                            paddingRight: '6px',
                            borderRadius: '20px',
                            fontFamily: 'Helvetica',
                            '&.Mui-focused fieldset': {
                                borderColor: dark,
                            },
                        },
                        '& .css-1uyx2m5-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':
                            {
                                color: dark,
                            },

                        '& .css-zi2b99-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':
                            {
                                color: dark,
                            },
                    }}
                    color="success"
                    size="small"
                    multiline
                    maxRows={2}
                    placeholder="Hit Ctrl+Enter to send message"
                    autoFocus
                    onKeyDown={handleKey}
                    onChange={textfieldOnChange}
                />
                <input
                    accept="image/*"
                    id="sendImage"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageInput}
                />
                <IconButton sx={{ ml: 1, pb: '4px' }}>
                    <label htmlFor="sendImage">
                        <Tooltip title="Select an Image">
                            <ImageIcon
                                sx={{
                                    fontSize: '33px',
                                    cursor: 'pointer',
                                    color: deepDark,
                                }}
                            />
                        </Tooltip>
                    </label>
                </IconButton>
                <IconButton onClick={handleSendMsg} sx={{ mr: '10px' }}>
                    <Tooltip title="Hit Ctrl + Enter to send">
                        <SendIcon
                            sx={{
                                fontSize: '33px',
                                color: deepDark,
                            }}
                        />
                    </Tooltip>
                </IconButton>
            </Box>
        </Box>
    );
};

export default MessageInput;
