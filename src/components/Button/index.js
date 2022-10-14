import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const Button = ({
    to,
    href,
    primary = false,
    outline = false,
    small = false,
    large = false,
    text = false,
    disable = false,
    rounded = false,
    children,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) => {
    let Comp = 'button';
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        large,
        text,
        disable,
        rounded,
    });

    const props = {
        onClick,
        ...passProps,
    };
    if (disable) {
        delete props.onClick;
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
};

export default Button;
