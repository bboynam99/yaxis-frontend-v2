import React, { useContext } from 'react'
import styled from 'styled-components'
import { useAPY } from '../../../state/internal/hooks'

import { Tooltip, Row } from 'antd'
import APYCalculator from '../../../components/APYCalculator'
import Typography from '../../../components/Typography'
import Value from '../../../components/Value'
import CardRow from '../../../components/CardRow'
import ClaimAll from '../../../components/ClaimAll'
import Card from '../../../components/Card'
import { InfoCircleOutlined } from '@ant-design/icons'
import BigNumber from 'bignumber.js'
import useTranslation from '../../../hooks/useTranslation'

const { Text } = Typography

interface TooltipRowProps {
	main: string
	value: any
	suffix?: string
}

const TooltipRow = ({ main, value, suffix }: TooltipRowProps) => (
	<>
		<div
			style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}
		>
			{main}
		</div>
		<Row>
			<Value
				value={value}
				numberSuffix="%"
				decimals={2}
				color={'white'}
			/>
			<span style={{ fontSize: '10px' }}>{suffix}</span>
		</Row>
	</>
)

type Props = { totalUSDBalance: string; balanceLoading: boolean }

const InvestmentDetailOverview: React.FC<Props> = ({
	totalUSDBalance,
	balanceLoading,
}) => {
	const translate = useTranslation()

	const {
		threeCrvApyPercent,
		yaxisApyPercent,
		yaxisAprPercent,
		lpApyPercent,
		totalAPY,
		totalAPR,
	} = useAPY('MetaVault')

	return (
		<Card title={translate('Account Overview')} icon="yaxis">
			<ClaimAll />
			{/* <CardRow
				main={
					<Tooltip
						title={
							<>
								<Row style={{ marginBottom: '5px' }}>
									Annual Percentage Rate
								</Row>
								<TooltipRow
									main={'Curve LP APY:'}
									value={lpApyPercent.toNumber()}
								/>
								<TooltipRow
									main={'CRV APY:'}
									value={threeCrvApyPercent.toNumber()}
								/>
								<TooltipRow
									main={'YAXIS rewards APR:'}
									value={yaxisAprPercent.toNumber()}
								/>
							</>
						}
					>
						<Text type="secondary">Average APR </Text>
						<StyledInfoIcon alt="YAXIS Supply Rewards" />
					</Tooltip>
				}
				secondary={
					<Value
						value={lpApyPercent
							.plus(threeCrvApyPercent)
							.plus(yaxisAprPercent)
							.toNumber()}
						numberSuffix={'%'}
						decimals={2}
					/>
				}
				rightContent={
					<>
						<Row>
							<Tooltip
								title={
									<>
										<Row style={{ marginBottom: '5px' }}>
											Annual Percentage Yield
										</Row>
										<TooltipRow
											main={'Curve LP APY:'}
											value={lpApyPercent.toNumber()}
										/>
										<TooltipRow
											main={'CRV APY:'}
											value={threeCrvApyPercent.toNumber()}
										/>
										<TooltipRow
											main={'YAXIS rewards APY:'}
											value={yaxisApyPercent.toNumber()}
											suffix={'* daily compound'}
										/>
									</>
								}
							>
								<Text type="secondary">Average APY </Text>
								<StyledInfoIcon alt="YAXIS Supply Rewards" />
							</Tooltip>
						</Row>
						<Row>
							<Value
								value={totalAPY.toNumber()}
								numberSuffix={'%'}
								decimals={2}
							/>
						</Row>
					</>
				}
			/> */}
			<APYCalculator
				APR={totalAPR.toNumber()}
				balance={new BigNumber(totalUSDBalance)}
				loading={balanceLoading}
				page={'metavault'}
				last
			/>
		</Card>
	)
}

export default InvestmentDetailOverview

const StyledInfoIcon = styled(InfoCircleOutlined)`
	margin-left: 5px;
	color: ${(props) => props.theme.secondary.font};
	font-size: 15px;
`
