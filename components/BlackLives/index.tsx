import dynamic from 'next/dynamic';

export const BlackLives = dynamic(() => import('./BlackLives'), { ssr: false });
