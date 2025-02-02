import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Modal } from 'antd'
import { SUPPORTED_NETWORKS, NETWORK_NAMES } from '../../../../connectors'
import { ApplicationModal } from '../../../../state/application/actions'
import {
	useOpenModal,
	useCloseModal,
	useIsModalOpen,
} from '../../../../state/application/hooks'
import useTranslation from '../../../../hooks/useTranslation'

export const NetworkCheck: React.FC = () => {
	const translate = useTranslation()
	const { chainId, active } = useWeb3React()

	const visible = useIsModalOpen(ApplicationModal['UNSUPPORTED_NETWORK'])
	const openModal = useOpenModal(ApplicationModal['UNSUPPORTED_NETWORK'])
	const closeModal = useCloseModal()

	useEffect(() => {
		if (active && !SUPPORTED_NETWORKS.includes(chainId)) openModal()
	}, [active, chainId, openModal])

	useEffect(() => {
		if (visible && SUPPORTED_NETWORKS.includes(chainId)) closeModal()
	}, [visible, chainId, closeModal])

	return (
		<Modal
			closable={false}
			visible={visible}
			title={translate('Unsupported Network')}
			footer={null}
		>
			<>
				<div>
					{translate(
						'Please switch to one of the following Ethereum networks',
					)}
				</div>
				{SUPPORTED_NETWORKS.map((n) => {
					const name = NETWORK_NAMES[n]
					return (
						<div key={n}>
							{name && name[0].toUpperCase() + name.slice(1)}
						</div>
					)
				})}
			</>
		</Modal>
	)
}
