import { useState } from 'react';

import { ReactComponent as DatabaseIcon } from '~/assets/16-database.svg';
import { ReactComponent as ChevronIcon } from '~/assets/16-chevron-down.svg';
import { Entity, useSchema } from '~/utils/use-schema';
import { useSelectedEntity } from '~/utils/use-selected-entity';
import { EntityRow } from './entity-row';
import styles from './styles.module.css';

export const BackendRow = ({ backend }: { backend: string }) => {
	const { entitiesForBackend } = useSchema();
	const { selectedEntity } = useSelectedEntity();
	const [expanded, setExpanded] = useState(selectedEntity?.backendId === backend);

	return (
		<ul key={backend} className={styles.entity}>
			<li className={expanded ? styles.open : styles.closed}>
				<a
					href="/#"
					onClick={(e) => {
						e.preventDefault();
						setExpanded(!expanded);
					}}
				>
					<DatabaseIcon />
					{backend}
					<ChevronIcon />
				</a>
				<ul>
					{entitiesForBackend(backend).map((entity) => (
						<EntityRow key={entity.name} entity={entity} />
					))}
				</ul>
			</li>
		</ul>
	);
};
