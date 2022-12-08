import { useQuery } from '@apollo/client';
import { ResponsiveAreaBump } from '@nivo/bump';
import { ResponsiveLine } from '@nivo/line';
import { theme } from '../../theme';
import { ProfitAndLossResult, PROFIT_AND_LOSS } from './graphql';
import styles from './styles.module.css';
import { netProfitTooltip } from './tooltips';

type TenantNetProfitData = {
	id: string;
	data: { x: Date; y: number }[];
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthString = (date: Date) => `${months[date.getMonth()]} ${date.getFullYear()}`;

export const AllCompanies = () => {
	const { data, loading } = useQuery<ProfitAndLossResult>(PROFIT_AND_LOSS, {
		variables: {
			description: 'Net Profit',
		},
	});

	if (loading) return <p>Loading...</p>;
	if (!data) return <p>Error: Missing data.</p>;

	// Net Profit calculation
	const tenantNetProfitMap = new Map<string, TenantNetProfitData>();
	for (const row of data.profitAndLossRows) {
		// Net profit map per tenant
		if (!tenantNetProfitMap.has(row.tenant.id)) {
			tenantNetProfitMap.set(row.tenant.id, { id: row.tenant.tenantName, data: [] });
		}
		tenantNetProfitMap.get(row.tenant.id)?.data.push({ x: new Date(row.date), y: row.amount });
	}

	// Ranking
	const rankingData = [...tenantNetProfitMap.values()].map((record) => ({
		...record,
		data: record.data.reverse().map(({ x, y }) => ({ x: monthString(x), y })),
	}));
	rankingData.push({
		id: 'Baseline',
		data: rankingData[0].data.map(({ x }) => ({ x, y: 0 })),
	});

	return (
		<div className={styles.wrapper}>
			<div className={styles.reportSection}>
				<h2 className={styles.reportHeading}>Ranking</h2>
				<ResponsiveAreaBump
					data={rankingData}
					axisTop={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: '',
						legendPosition: 'middle',
						legendOffset: -36,
					}}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: '',
						legendPosition: 'middle',
						legendOffset: 32,
					}}
					margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
					theme={theme}
				/>
				<h2 className={styles.reportHeading}>Net Profit</h2>
				<ResponsiveLine
					data={[...tenantNetProfitMap.values()]}
					animate
					curve="monotoneX"
					useMesh
					xScale={{ type: 'time' }}
					yScale={{ type: 'linear' }}
					yFormat="$,.2f"
					enableGridY={false}
					enableSlices="x"
					margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
					axisLeft={{
						legend: '$AUD',
						legendOffset: 12,
						format: (value: number) => `$${Math.floor(value / 1_000_00) / 10}m`,
					}}
					axisBottom={{
						format: (value: Date) => monthString(value),
						legend: 'Month',
						legendOffset: -12,
					}}
					tooltip={netProfitTooltip}
					theme={theme}
				/>
			</div>
		</div>
	);
};
