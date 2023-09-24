import React from 'react';
import dynamic from 'next/dynamic';

import { HomePrePage } from '@/components/pages/HomePage/HomePrePage';

const HomePostPage = dynamic(() => import('@/components/pages/HomePage/HomePostPage')
	.then((mod) => mod.HomePostPage))

export const HomePage = () => {
	return (
		<HomePrePage>
			<HomePostPage />
		</HomePrePage>
	);
}
