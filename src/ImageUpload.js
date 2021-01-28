import { Button, Input } from '@material-ui/core';
import React, { useState } from 'react';
import firebase from 'firebase';
import { db, storage } from './firebase';
import './ImageUpload.css';

function ImageUpload({ username }) {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            err => {
                console.log(err);
                alert(err.message);
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgUrl: url,
                            username: username
                        });

                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        )
    }

    return (
        <div className='uploader'>
            <Input required type='text' placeholder='Enter a caption...' value={caption} onChange={e => setCaption(e.target.value)} />
            <Input required type='file' onChange={handleChange} />
            <progress className='progressBar' value={progress} max='100' />
            <Button disabled={!image} onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload;