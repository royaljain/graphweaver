import { Button } from '../button';
import { Dropdown } from '../dropdown';
import type { DropdownItem } from '../dropdown';

import { ReactComponent as OpenPlaygroundIcon } from '../assets/16-open-external.svg';
import { ReactComponent as FilterIcon } from '../assets/16-filter.svg';
import styles from './styles.module.css';

// const BlankSlate = () => (
// 	<div id={styles.centerBlankSlate}>
// 		<div className={styles.blankSlateWrapper}>
// 			<DataSourcesIcon />
// 			<h1>No data sources yet</h1>
// 			<p className="subtext">
// 				Connect data sources. See the <a href="/#">readme</a> for more details
// 			</p>
// 		</div>
// 	</div>
// );

export interface ToolBarProps {
	title?: string;
	subtitle?: string;
}

export const ToolBar = ({ title, subtitle }: ToolBarProps) => {
	const filterItems: DropdownItem[] = [
		{
			id: 'test',
			name: 'Test',
			onClick: () => {
				alert('Clicked Test');
			},
		},
	];

	const externalLinkItems: DropdownItem[] = [
		{
			id: 'google',
			name: 'Google',
			href: 'https://google.com/',
			renderAfter: () => <OpenPlaygroundIcon />,
		},
	];

	return (
		<div className={styles.toolBarWrapper}>
			<div className="titleWrapper">
				<h1>{title}</h1>
				<p className="subtext">{subtitle}</p>
			</div>

			<div className={styles.toolsWrapper}>
				<input className={styles.search} type="search" name="search" placeholder="Search..." />

				<Dropdown items={filterItems} renderBefore={() => <FilterIcon />}>
					Filter
				</Dropdown>

				<Button renderAfter={() => <OpenPlaygroundIcon />}>Open playground</Button>

				<Dropdown items={externalLinkItems}>Links</Dropdown>
			</div>
		</div>
	);
};
