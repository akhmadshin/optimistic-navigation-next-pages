import React from 'react';
import dynamic from 'next/dynamic';

import { HomePrePage } from '@/components/pages/HomePage/HomePrePage';
import { Page } from '@/components/pages/Page';

const HomePostPage = dynamic(() => import('@/components/pages/HomePage/HomePostPage').then((mod) => mod.HomePostPage))

export const HomePage = () => {
	return (
		<Page>
			<HomePrePage>
				<HomePostPage />
			</HomePrePage>
		</Page>
	);
}
