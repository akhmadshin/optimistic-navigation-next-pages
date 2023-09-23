import { useEffect } from 'react';
import { ParentComponent } from '@/types/general';

export const Page: ParentComponent = ({ children }) => {
	useEffect(() => {
		if (typeof window !== 'undefined' && window.pageMounted) {
			window.pageMounted();
			window.pageMounted = undefined;
		}
	})

	return children;
}