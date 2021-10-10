import styled from 'styled-components'
import { Col, Tooltip } from 'antd'
import Typography from '../../../components/Typography'
import {
	DetailOverviewCard,
	DetailOverviewCardRow,
} from '../../../components/DetailOverviewCard'
import { CardRow } from '../../../components/ExpandableSidePanel'
import useTranslation from '../../../hooks/useTranslation'
import Value from '../../../components/Value'
import { useReturns } from '../../../state/wallet/hooks'
import { InfoCircleOutlined } from '@ant-design/icons'

const { Text } = Typography

interface TooltipRowProps {
	main: string
	value: any
}

const TooltipRow = ({ main, value }: TooltipRowProps) => (
	<>
		<div
			style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}
		>
			{main}
		</div>
		<div>
			<Value
				value={value}
				numberPrefix="$"
				decimals={2}
				color={'white'}
			/>
		</div>
	</>
)

/**
 * Creates a loadable detail overview for users on the home page, showing financial returns and account balances.
 */
export default function HomeOverviewCard() {
	const translate = useTranslation()

	const {
		rewardsUSD,
		rewards: { governance, lp, metaVault },
	} = useReturns()

	return (
		<DetailOverviewCard title={translate('Your Lifetime Earnings')}>
			<CardRow
				main={
					<StyledText>
						{translate('Interest Earned')}
						<Tooltip
							title={
								<>
									<div
										style={{
											fontSize: '16px',
											fontWeight: 700,
										}}
									>
										{translate('Your YAXIS rewards')}:
									</div>
									<TooltipRow
										main={translate('Vault rewards')}
										value={metaVault.toNumber()}
									/>
									<TooltipRow
										main={translate(
											'Governance (YAXIS) rewards',
										)}
										value={governance.toNumber()}
									/>
									<TooltipRow
										main={translate(
											'Liquidity Pool token rewards',
										)}
										value={lp.toNumber()}
									/>
								</>
							}
						>
							<StyledInfoIcon alt={translate('YAXIS Rewards')} />
						</Tooltip>
					</StyledText>
				}
				secondary={null}
				rightContent={
					<Col>
						<Value
							numberPrefix="$"
							value={
								0
								// rewardsUSD.toNumber()
								// TODO
							}
							decimals={2}
						/>
					</Col>
				}
			/>

			<CardRow
				main={
					<StyledText>
						{translate('Rewards Earned')}
						<Tooltip
							title={
								<>
									<div
										style={{
											fontSize: '16px',
											fontWeight: 700,
										}}
									>
										{translate('Your YAXIS rewards')}:
									</div>
									<TooltipRow
										main={translate('Vault rewards')}
										value={metaVault.toNumber()}
									/>
									<TooltipRow
										main={translate(
											'Governance (YAXIS) rewards',
										)}
										value={governance.toNumber()}
									/>
									<TooltipRow
										main={translate(
											'Liquidity Pool token rewards',
										)}
										value={lp.toNumber()}
									/>
								</>
							}
						>
							<StyledInfoIcon alt={translate('YAXIS Rewards')} />
						</Tooltip>
					</StyledText>
				}
				secondary={null}
				rightContent={
					<Col>
						<Value
							numberPrefix="$"
							value={
								// rewardsUSD.toNumber()
								0
								// TODO
							}
							decimals={2}
						/>
						<Value
							numberSuffix=" YAXIS"
							value={0}
							decimals={0}
							fontSize={'14px'}
							color={'grey'}
						/>
					</Col>
				}
				last
			/>
		</DetailOverviewCard>
	)
}

const StyledText = styled(Text)`
	@media only screen and (max-width: 600px) {
		margin-right: 55px;
	}
`

const StyledInfoIcon = styled(InfoCircleOutlined)`
	margin-left: 5px;
	color: ${(props) => props.theme.secondary.font};
	font-size: 15px;
`
