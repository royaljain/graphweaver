import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ReactComponent as TableIcon } from '~/assets/16-table.svg';
import { routeFor } from '~/utils/route-for';

import styles from './styles.module.css';

export const DashboardRow = ({ name, tenantId }: { name: string; tenantId?: string }) => (
	<li>
		<NavLink
			to={routeFor({ dashboard: name, tenantId })}
			className={({ isActive }) => classnames(styles.subListItem, isActive && styles.active)}
			end
		>
			<TableIcon />
			{name}
		</NavLink>
	</li>
);
