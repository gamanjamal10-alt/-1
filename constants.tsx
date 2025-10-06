// FIX: Import React to resolve the 'JSX' namespace error, as this file contains JSX syntax for icon components.
import React from 'react';
import type { StoreType } from './types';

export const ANNUAL_FEE = 6500;

export const STORE_TYPE_DETAILS: { [key in StoreType]: { description: string; icon: JSX.Element } } = {
    'فلاح': {
        description: 'بيع منتجاتك الزراعية مباشرة من الحقل إلى المستهلك.',
        icon: <LeafIcon className="w-12 h-12 text-green-500" />,
    },
    'تاجر جملة': {
        description: 'توفير كميات كبيرة من المنتجات لتجار التجزئة والأسواق.',
        icon: <BuildingStorefrontIcon className="w-12 h-12 text-blue-500" />,
    },
    'تاجر تجزئة': {
        description: 'بيع الخضر والفواكه والمنتجات الأخرى مباشرة للمستهلكين.',
        icon: <ShoppingCartIcon className="w-12 h-12 text-orange-500" />,
    },
    'نقل': {
        description: 'توفير خدمات لوجستية لنقل البضائع بين المزارعين والتجار.',
        icon: <TruckIcon className="w-12 h-12 text-gray-500" />,
    },
};

// --- ICONS ---

export function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
}

export function BuildingStorefrontIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75H9m4.5 0v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v4.5m11.25-1.5a.75.75 0 0 0-.75-.75H18a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75V18ZM3 16.5v-7.5a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75Zm11.25 0v-7.5a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75Z" />
        </svg>
    );
}

export function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-6.852a1.125 1.125 0 0 0-.936-1.423H5.318M15 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    );
}

export function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-9m17.25 9v-9m-17.25-3.375h15.75c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-6.75c0-.621.504-1.125 1.125-1.125Z" />
        </svg>
    );
}