import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames';

const Image = forwardRef(({ src, alt, className, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');
    // console.log(images);
    const handleError = () => {
        setFallBack(images.noImage);
    };
    return (
        <img
            className={classNames(styles.wrapper, className)}
            src={fallBack || src}
            alt={alt}
            {...props}
            ref={ref}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
};
export default Image;
