import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import * as videoService from '~/services/videoService';
const cx = classNames.bind(styles);
const Upload = () => {
    const [file, setFile] = useState('');
    const [description, setDescription] = useState('');
    const metaToken = localStorage.getItem('token');
    const videoRef = useRef('');
    const navigate = useNavigate();
    const handlePostVideo = () => {
        const post = {
            upload_file: file,
            thumbnail_time: 2,
            description: description,
        };
        console.log(post);
        videoService
            .createAVideo({ post: post, accessToken: metaToken.token })
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleChangeFile = (e) => {
        const fileInfor = e.target.files[0];
        setFile(fileInfor);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('contain')}>
                <div className={cx('heading')}>
                    <strong>Upload video</strong>
                    <span>Post a video to your account</span>
                </div>
                <div className={cx('content-form')}>
                    <div className={cx('select-video')}>
                        <div className={cx('form-input')}>
                            <input type="file" accept="video/*" ref={videoRef} onChange={handleChangeFile} />
                            <div className={cx('property-video')}>
                                <img src={images.upload} />
                                <strong>Select video to upload</strong>
                                <p>Or drag and drop a file</p>
                                <h4>MP4 pr WebM</h4>
                                <h4>720x1280 resolution or highter</h4>
                                <h4>Up to 30 minutes</h4>
                                <h4>Less than 2GB</h4>
                                <Button className={cx('button')} primary>
                                    Select file
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('about-video')}>
                        <div className={cx('edit-video')}>
                            <div className={cx('icon-edit')}>
                                <img src={images.editVideo} alt="Edit video" />
                                <div className={cx('content-edit')}>
                                    <strong>Divide videos and edit</strong>
                                    <p>
                                        You can quickly divide videos into multiple parts, remove redundant parts and
                                        turn landscape videos into portrait videos
                                    </p>
                                </div>
                            </div>
                            <Button primary>Edit</Button>
                        </div>
                        <div className={cx('caption-video')}>
                            <div className={cx('caption-label')}>
                                <label>Caption</label>
                                <span>0 / 150</span>
                            </div>
                            <div className={cx('caption-input')}>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <img src={images.aXoay} className={cx('a-cong')} />
                                <img src={images.thang} className={cx('thang')} />
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={handlePostVideo}>Post</Button>
            </div>
        </div>
    );
};

export default Upload;
