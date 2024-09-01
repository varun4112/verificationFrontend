"use client"; // Mark as a client component

import { Provider } from 'react-redux';
import { store } from '@/lib/store';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default Providers;
