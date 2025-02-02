import {
	Config,
	CurrenciesConfig,
	ExternalConfig,
	ExternalPoolsConfig,
} from '../../type'

const currencies: CurrenciesConfig = {
	ERC20: {
		crv: '0xd533a949740bb3306d119cc777fa900ba034cd52',
		wbtc: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
		link: '0x514910771af9ca656af840dff83e8264ecf986ca',
		mim: '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3',
		cvx: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
		yax: '0xb1dc9124c395c1e97773ab855d66e879f053a289',
		usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
		dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
		usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
		'3crv': '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
		weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
		mvlt: '0xBFbEC72F2450eF9Ab742e4A27441Fa06Ca79eA6a',
		spell: '0x090185f2135308bad17527004364ebcc2d37e5f6',
	},
	ERC677: {
		yaxis: '0x0adA190c81b814548ddC2F6AdC4a689ce7C1FE73',
	},
}

const external: ExternalConfig = {
	multicall: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
	pickleChef: '0xbD17B1ce622d73bD438b9E658acA5996dc394b0d',
	pickleJar: '0x1BB74b5DdC1f4fC91D6f9E7906cf68bc93538e33',
	uniswapRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
	gaugeController: '0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB',
}

const externalPools: ExternalPoolsConfig = {
	curve: {
		mim3crv: {
			currency: 'usd',
			pool: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B',
			token: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B',
			gauge: '0xd8b712d29381748dB89c36BCa0138d7c75866ddF',
			convexRewards: '0xFd5AbF66b003881b88567EB9Ed9c651F14Dc4771',
			extraRewards: {
				spell: {
					contract: '0x69a92f1656cd2e193797546cFe2EaF32EACcf6f7',
					token: '0x090185f2135308bad17527004364ebcc2d37e5f6',
				},
			},
		},
		rencrv: {
			currency: 'btc',
			pool: '0x93054188d876f558f4a66B2EF1d97d16eDf0895B',
			token: '0x49849C98ae39Fff122806C06791Fa73784FB3675',
			gauge: '0xB1F2cdeC61db658F091671F5f199635aEF202CAC',
			convexRewards: '0x8E299C62EeD737a5d5a53539dF37b5356a27b07D',
		},
		alethcrv: {
			currency: 'eth',
			pool: '0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e',
			token: '0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e',
			gauge: '0x12dCD9E8D1577b5E4F066d8e7D404404Ef045342',
			convexRewards: '0x48Bc302d8295FeA1f8c3e7F57D4dDC9981FEE410',
		},
		linkcrv: {
			currency: 'link',
			pool: '0xF178C0b5Bb7e7aBF4e12A4838C7b7c5bA2C623c0',
			token: '0xcee60cfa923170e4f8204ae08b4fa6a3f5656f3a',
			gauge: '0xFD4D8a17df4C27c1dD245d153ccf4499e806C87D',
			convexRewards: '0x9700152175dc22E7d1f3245fE3c1D2cfa3602548',
		},
		'3pool': {
			currency: 'usd',
			pool: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
			token: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
			gauge: '0xbFcF63294aD7105dEa65aA58F8AE5BE2D9d0952A',
			convexRewards: '0x689440f2Ff927E1f24c72F1087E1FAF471eCe1c8',
		},
	},
}

const mainnet: Config = {
	internal: {
		// Current
		manager: '0xAB72cC293B63f6477BAf9d514Da735Cf6caADC2d',
		controller: '0x834ebCE3b3Fb5B9647d9398a1f6F44A2E831aC60',
		vaultHelper: '0x259ac58Aa39A64614af1afe6A4c266cFE09510cF',
		minter: '0x84b6532A366c9ea7000Ed618B9E957deFC355242',
		minterWrapper: '0x0167f82398775C1A1175d73E86CE06BfCfE3aac1',
		stableSwap3PoolConverter: '0x2eab685d85AA52E4d8b6699Ba5aAC3b0c3992C3B',
		votingEscrow: '0x66b4c0dAA0C65ED1eae84B4d738B9572a79389c4',
		gaugeController: '0x17F9F0dAc5066d43d0875Fa08E5757580BBf4C8C',
		merkleDistributor: '0xd0c9432625a181c823b3e63d5e6656f87231ae96',
		// Legacy
		swap: '0xCdF398537adbF8617a8401B14DCEe7F67CF8c64b',
		yaxisChef: '0xc330e7e73717cd13fb6ba068ee871584cf8a194f',
		xYaxStaking: '0xeF31Cb88048416E301Fee1eA13e7664b887BA7e8',
		yAxisMetaVault: '0xBFbEC72F2450eF9Ab742e4A27441Fa06Ca79eA6a',
	},
	rewards: {
		MetaVault: '0x226f9954A1221cDe805C76CfB312A5d761630E14',
		Yaxis: '0x3b09B9ADFe11f92225b4C55De89fa81456595CD9',
		'Uniswap YAXIS/ETH': '0xEDaFe410e2f07ab9D7F1B04316D29C2F49dCb104',
	},
	vaults: {
		usd: {
			url: 'https://curve.fi/mim/deposit',
			tokenPoolContract: externalPools.curve.mim3crv.pool,
			token: 'MIM3CRV',
			tokenContract: externalPools.curve.mim3crv.token,
			vault: '0x9720346Ba80b668E50A5560c200180515fEbb895',
			vaultToken: 'CV:USD',
			vaultTokenContract: '0x2C1e6D004d4f06F92464e0208b04D260b3eF46A5',
			gauge: '0x9a4A2a2E8f755b77eb512E8A8fE635B803950D51',
		},
		btc: {
			url: 'https://curve.fi/ren/deposit',
			tokenPoolContract: externalPools.curve.rencrv.pool,
			token: 'RENCRV',
			tokenContract: externalPools.curve.rencrv.token,
			vault: '0x0b42B20280216D604bB2B6a8944Fb9027b43dF8d',
			vaultToken: 'CV:BTC',
			vaultTokenContract: '0x0C44393DA03216E934b3A5503DECF7f78174b2f3',
			gauge: '0x9AA02011a90736176f9CdC38FF4d1Ed7C90309b6',
		},
		eth: {
			url: 'https://curve.fi/factory/38/deposit',
			tokenPoolContract: externalPools.curve.alethcrv.pool,
			token: 'ALETHCRV',
			tokenContract: externalPools.curve.alethcrv.token,
			vault: '0xCAB23CA4E75E8A9F12EBCa7f51D6b3EFe97699e7',
			vaultToken: 'CV:ETH',
			vaultTokenContract: '0xeF84fAc432846Ad5f6f1bD4caCcF2849e2818e66',
			gauge: '0x43103fE8Bd1049f756370F831634812Eb4eFf7D3',
		},
		link: {
			url: 'https://curve.fi/link/deposit',
			tokenPoolContract: externalPools.curve.linkcrv.pool,
			token: 'LINKCRV',
			tokenContract: externalPools.curve.linkcrv.token,
			vault: '0x27d9A1dc3725Fa5E4e7128b1db7e9Da75eb3aeE5',
			vaultToken: 'CV:LINK',
			vaultTokenContract: '0x5f6e4DeA25086C973C31857A04a73c66Ef41e43C',
			gauge: '0x60fd915B2251dEc19C57eDD75B0a688EA0A3bfe5',
		},
		yaxis: {
			url: '',
			tokenPoolContract: '',
			token: 'YAXIS',
			tokenContract: '',
			vault: '',
			vaultToken: 'YAXIS',
			vaultTokenContract: currencies.ERC677.yaxis,
			gauge: '0x951E7726d70017E56756A6807886113708A699Fb',
		},
	},
	pools: {
		'Uniswap YAXIS/ETH': {
			active: true,
			legacy: false,
			type: 'uniswap',
			liquidId: `${currencies.ERC677.yaxis}/ETH`,
			lpAddress: '0xF0E3FdF48661CD10d56692f60BD4eCcd01E9CF64',
			lpUrl: `https://app.uniswap.org/#/add/v2/ETH/${currencies.ERC677.yaxis}`,
			lpTokens: [
				{
					tokenId: 'yaxis',
				},
				{
					tokenId: 'eth',
				},
			],
			tokenAddress: currencies.ERC677.yaxis,
			name: 'Uniswap YAXIS/ETH',
			symbol: 'YAXIS/ETH UNI-V2 LP',
			tokenSymbol: 'YAXIS_ETH_UNISWAP_LP',
			icon: '',
			rewards: 'Uniswap YAXIS/ETH',
		},
		'Uniswap YAX/ETH': {
			legacy: true,
			pid: 6,
			active: true,
			type: 'uniswap',
			liquidId: `${currencies.ERC20.yax}/ETH`,
			lpAddress: '0x1107b6081231d7f256269ad014bf92e041cb08df',
			lpUrl: `https://app.uniswap.org/#/add/v2/ETH/${currencies.ERC20.yax}`,
			lpTokens: [
				{
					tokenId: 'yax',
				},
				{
					tokenId: 'eth',
				},
			],
			tokenAddress: currencies.ERC20.yax,
			name: 'Uniswap YAX/ETH',
			symbol: 'YAX/ETH UNI-V2 LP',
			tokenSymbol: 'YAX_ETH_UNISWAP_LP',
			icon: '',
		},
		'Linkswap YAX/ETH': {
			legacy: true,
			pid: null,
			active: true,
			type: 'linkswap',
			liquidId: `${currencies.ERC20.yax}/ETH`,
			lpAddress: '0x21dee38170F1e1F26baFf2C30C0fc8F8362b6961',
			lpUrl: `https://linkswap.app/#/add/${currencies.ERC20.yax}/ETH`,
			lpTokens: [
				{
					tokenId: 'yax',
				},
				{
					tokenId: 'eth',
				},
			],
			tokenAddress: currencies.ERC20.yax,
			name: 'Linkswap YAX/ETH',
			symbol: 'YAX/ETH LINKSWAP LP',
			tokenSymbol: 'YAX_ETH_LINKSWAP_LP',
			icon: '',
		},
	},
	currencies,
	external,
	externalPools,
}

export default mainnet
