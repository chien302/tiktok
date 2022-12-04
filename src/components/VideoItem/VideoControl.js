import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './VideoControl.module.scss';

const cx = classNames.bind(styles);
const VideoControl = ({ refVideo }) => {
    const [isPlay, setIsPlay] = useState(false);
    const [isIncrease, setIsIncrease] = useState(false);
    const [volume, setVolume] = useState(0);

    // console.log(refVideo);
    const handlePlayVideo = () => {
        refVideo.current.pause();
        setIsPlay(false);
        if (volume === 0) {
            refVideo.current.volume = 0;
        }
    };
    const handlePauseVideo = () => {
        refVideo.current.play();
        setIsPlay(true);
        if (volume === 0) {
            refVideo.current.volume = 0;
        }
    };
    const handleIncreaseVolume = () => {
        setIsIncrease(true);
        setVolume(70);
        refVideo.current.volume = 0.7;
    };
    const handleDecreaseVolume = () => {
        setIsIncrease(false);
        setVolume(0);
        refVideo.current.volume = 0;
    };
    const handleVolume = (e) => {
        const num = e.target.value;
        // console.log(num);
        refVideo.current.volume = num / 100;
        setVolume(num);
        if (num > 0) {
            setIsIncrease(true);
        } else {
            setIsIncrease(false);
        }
    };
    return (
        <>
            {/* <div className={cx('wrapper')}> */}
            <div className={cx('play')}>
                {isPlay ? (
                    <div className={cx('icon')} onClick={handlePlayVideo}>
                        <FontAwesomeIcon icon={faPause} />
                    </div>
                ) : (
                    <div className={cx('icon')} onClick={handlePauseVideo}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                )}
            </div>
            <div className={cx('speaker')}>
                {!isIncrease || volume === 0 ? (
                    <div className={cx('icon-volume')} onClick={handleIncreaseVolume}>
                        <FontAwesomeIcon icon={faVolumeXmark} />
                    </div>
                ) : (
                    <div className={cx('icon-volume')} onClick={handleDecreaseVolume}>
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    </div>
                )}

                <div className={cx('volume')}>
                    <input type="range" min="0" max="100" value={volume} onChange={handleVolume} />
                </div>
            </div>
            {/* </div> */}
        </>
    );
};

export default VideoControl;
