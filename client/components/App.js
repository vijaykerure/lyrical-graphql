import React from 'react';
import { Outlet } from 'react-router-dom';

export default () => {
    return <div className="container">
        <Outlet />
    </div>;
};
