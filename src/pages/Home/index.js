import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import * as videoService from '~/services/videoService';
import VideoItem from '~/components/VideoItem';
// import useKeyPress from '~/hooks/useKeyPress';

const cx = classNames.bind(styles);
// const INIT_PAGE = 1;
const Home = () => {
    const [listVideo, setListVideo] = useState([]);
    const [page, setPage] = useState(2);
    // const refItem = useRef();
    // console.log(refItem.current);

    useEffect(() => {
        videoService
            .getVideos({ type: 'for-you' })
            .then((data) => {
                setListVideo(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const fetchListVideo = async () => {
        const result = await videoService.getVideos({ type: 'for-you', page });
        return result;
    };

    const fetchData = async () => {
        const listNextVideo = await fetchListVideo();

        setListVideo([...listVideo, ...listNextVideo]);
        setPage((prev) => prev + 1);
    };

    return (
        <div style={{ height: 2000 }}>
            <InfiniteScroll
                next={fetchData}
                style={{ overflow: 'unset' }}
                dataLength={listVideo.length}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                {listVideo.map((item) => (
                    // <div key={item.id}>
                    <VideoItem key={item.id} data={item} />
                    // </div>
                ))}
            </InfiniteScroll>
            <div>
                <input className={cx('input-hide')} type="text" />
            </div>
        </div>
    );
};

export default Home;
