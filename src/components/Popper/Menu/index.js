import React from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper } from '~/components/Popper';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

const Menu = ({ children, items = [] }) => {
    const renderItem = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} />);
    };
    return (
        <Tippy
            interactive={true}
            delay={[0, 700]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <Wrapper className={cx('menu-popper')}>{renderItem()}</Wrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
};

export default Menu;
