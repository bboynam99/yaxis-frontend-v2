import { useState, useMemo, useCallback } from 'react'
import { Currencies, Currency } from '../../../constants/currencies'
import { useVaultsBalances } from '../../../state/wallet/hooks'
import { usePrices } from '../../../state/prices/hooks'
import { Vaults, LPVaults } from '../../../constants/type'
import { Row, Grid, Form } from 'antd'
import styled from 'styled-components'
import { numberToDecimal } from '../../../utils/number'
import useContractWrite from '../../../hooks/useContractWrite'
import Button from '../../../components/Button'
import Table from '../../../components/Table'
import Typography from '../../../components/Typography'
import {
	CurrencyValues,
	handleFormInputChange,
	computeTotalDepositing,
} from '../utils'
import BigNumber from 'bignumber.js'
import Value from '../../../components/Value'
import Input from '../../../components/Input'
import useTranslation from '../../../hooks/useTranslation'
import { TYaxisManagerData } from '../../../state/internal/hooks'

const { Text, Title } = Typography

const StyledText = styled(Text)`
	margin-left: 16px;
	font-size: 18px;
	line-height: 1em;
`
type SortOrder = 'descend' | 'ascend' | null

const makeColumns = (
	loading: boolean,
	translate: any,
	onChange: ReturnType<typeof handleFormInputChange>,
) => {
	return [
		{
			title: translate('Vault'),
			key: 'vault',
			width: '135px',
			sorter: (a, b) => a.vault.localeCompare(b.vault),
			render: (text, record) => (
				<Row align="middle">
					<img src={record.icon} height="36" width="36" alt="logo" />
					<StyledText>{record.vault.toUpperCase()}</StyledText>
				</Row>
			),
		},
		{
			title: translate('Vault Balance'),
			key: 'balance',
			defaultSortOrder: 'descend' as SortOrder,
			sorter: (a, b) =>
				new BigNumber(a.balanceUSD).minus(b.balanceUSD).toNumber(),
			render: (text, record) => (
				<>
					<Value
						value={record.balanceUSD}
						numberPrefix="$"
						decimals={2}
					/>
					<Text type="secondary">
						{record.balance.toFixed(2)} {record.name}
					</Text>
				</>
			),
		},
		{
			title: translate('Amount'),
			key: 'amount',
			render: (text, record) => {
				return (
					<Form.Item
						validateStatus={
							new BigNumber(record.value).gt(
								new BigNumber(record.balance),
							) && 'error'
						}
						style={{ marginBottom: 0 }}
					>
						<Input
							onChange={(e) => {
								onChange(record.tokenId, e.target.value)
							}}
							value={record.inputValue}
							min={'0'}
							max={`${record.balance}`}
							placeholder="0"
							disabled={loading || record.balance.isZero()}
							suffix={`${record.name}`}
							onClickMax={() =>
								onChange(record.tokenId, record.balance || '0')
							}
						/>
					</Form.Item>
				)
			},
		},
	]
}

const { useBreakpoint } = Grid

interface TableDataEntry extends Currency {
	balance: BigNumber
	balanceUSD: string
	value: BigNumber
	vault: string
}

interface UnstakeTableProps {
	fees: TYaxisManagerData
	currencies: Currency[]
}

/**
 * Creates a deposit table for the savings account.
 */
const WithdrawTable: React.FC<UnstakeTableProps> = ({ fees, currencies }) => {
	const translate = useTranslation()

	const { loading: loadingBalances, ...balances } = useVaultsBalances()

	const { md } = useBreakpoint()

	const { call: handleUnstakeETH, loading: isSubmittingETH } =
		useContractWrite({
			contractName: 'vaults.eth.gauge',
			method: 'withdraw(uint256)',
			description: `unstaked from ETH Gauge`,
		})

	const { call: handleUnstakeBTC, loading: isSubmittingBTC } =
		useContractWrite({
			contractName: 'vaults.btc.gauge',
			method: 'withdraw(uint256)',
			description: `unstaked from BTC Gauge`,
		})

	const { call: handleUnstakeUSD, loading: isSubmittingUSD } =
		useContractWrite({
			contractName: 'vaults.usd.gauge',
			method: 'withdraw(uint256)',
			description: `unstaked from USD Gauge`,
		})

	const { call: handleUnstakeLINK, loading: isSubmittingLINK } =
		useContractWrite({
			contractName: 'vaults.link.gauge',
			method: 'withdraw(uint256)',
			description: `unstaked from LINK Gauge`,
		})

	const { call: handleUnstakeYAXIS, loading: isSubmittingYAXIS } =
		useContractWrite({
			contractName: 'vaults.yaxis.gauge',
			method: 'withdraw(uint256)',
			description: `unstaked from YAXIS Gauge`,
		})

	const callsLookup = useMemo(() => {
		return {
			handleUnstakeETH,
			isSubmittingETH,
			handleUnstakeBTC,
			isSubmittingBTC,
			handleUnstakeUSD,
			isSubmittingUSD,
			handleUnstakeLINK,
			isSubmittingLINK,
			handleUnstakeYAXIS,
			isSubmittingYAXIS,
		}
	}, [
		handleUnstakeETH,
		isSubmittingETH,
		handleUnstakeBTC,
		isSubmittingBTC,
		handleUnstakeUSD,
		isSubmittingUSD,
		handleUnstakeLINK,
		isSubmittingLINK,
		handleUnstakeYAXIS,
		isSubmittingYAXIS,
	])

	const { prices } = usePrices()
	const [currencyValues, setCurrencyValues] = useState<CurrencyValues>(
		currencies.reduce(
			(prev, curr) => ({
				...prev,
				[curr.tokenId]: '',
			}),
			{},
		),
	)

	const disabled = useMemo(() => {
		const noValue = !Object.values(currencyValues).find(
			(v) => parseFloat(v) > 0,
		)
		const insufficientBalance = !!Vaults.find((vault) => {
			const vaultToken = vault === 'yaxis' ? 'yaxis' : `cv:${vault}`
			const gaugeToken = `${vaultToken}-gauge`
			const value = new BigNumber(currencyValues[gaugeToken] || 0)
			const currency = balances.balances[vault].gaugeToken
			return !!!currency || value.gt(currency?.amount || 0)
		})
		return noValue || insufficientBalance
	}, [currencyValues, balances])

	const totalWithdrawing = useMemo(
		() => computeTotalDepositing(currencies, currencyValues, prices),
		[currencies, currencyValues, prices],
	)

	const handleSubmit = useCallback(async () => {
		const transactions = Vaults.reduce<[string, string][]>(
			(previous, vault) => {
				const vaultToken = vault === 'yaxis' ? 'yaxis' : `cv:${vault}`
				const gaugeToken = `${vaultToken}-gauge`
				const _v = currencyValues[gaugeToken]
				if (_v)
					previous.push([
						vault.toUpperCase(),
						numberToDecimal(
							_v,
							Currencies[gaugeToken.toUpperCase()].decimals,
						),
					])

				return previous
			},
			[],
		)

		if (transactions.length > 0) {
			await Promise.allSettled(
				transactions.map(([token, amount]) =>
					callsLookup[`handleUnstake${token}`]({
						args: [amount],
						descriptionExtra: totalWithdrawing,
					}),
				),
			)
			setCurrencyValues(
				currencies.reduce(
					(prev, curr) => ({
						...prev,
						[curr.tokenId]: '',
					}),
					{},
				),
			)
		}
	}, [currencies, currencyValues, callsLookup, totalWithdrawing])

	const data = useMemo(
		() =>
			currencies.map<TableDataEntry>((c) => {
				const vault =
					c.tokenId !== 'yaxis-gauge'
						? c.tokenId.slice(3, -6).toLowerCase()
						: c.tokenId.slice(0, -6).toLowerCase()
				const [lpToken] = LPVaults.find(([, v]) => vault === v)
				const vaultToken = vault === 'yaxis' ? 'yaxis' : `cv:${vault}`
				const gaugeToken = `${vaultToken}-gauge`
				const currency = Currencies[gaugeToken.toUpperCase()]
				const balance =
					balances.balances[vault]?.gaugeToken?.amount ||
					new BigNumber(0)
				return {
					...currency,
					vault,
					balance,
					balanceUSD: new BigNumber(prices[lpToken])
						.times(balance)
						.toFixed(2),
					value: currencyValues
						? new BigNumber(currencyValues[gaugeToken] || 0)
						: new BigNumber(0),
					inputValue: currencyValues[gaugeToken],
					key: vault,
				}
			}),
		[currencies, balances, currencyValues, prices],
	)

	const columns = useMemo(
		() =>
			makeColumns(
				loadingBalances,
				translate,
				handleFormInputChange(setCurrencyValues),
			),
		[translate, loadingBalances],
	)

	return (
		<>
			<Table columns={columns} dataSource={data} pagination={false} />
			<div
				style={
					md
						? { padding: '2% 30%' }
						: { padding: '0 10%', margin: '10px' }
				}
			>
				<Text type="secondary">{translate('Total')}</Text>
				<Title level={3} style={{ margin: '0 0 10px 0' }}>
					${totalWithdrawing}
				</Title>
				<Button
					disabled={disabled}
					loading={
						callsLookup.isSubmittingETH ||
						callsLookup.isSubmittingBTC ||
						callsLookup.isSubmittingLINK ||
						callsLookup.isSubmittingUSD
					}
					onClick={handleSubmit}
					style={{ fontSize: '18px', width: '100%' }}
				>
					{translate('Unstake')}
				</Button>
				<Text
					type="secondary"
					style={{ marginTop: '10px', display: 'block' }}
				>
					{translate('Withdraw Fee')}:{' '}
					{fees.withdrawalProtectionFee.dividedBy(100).toNumber()}%
				</Text>
			</div>
		</>
	)
}

export default WithdrawTable
