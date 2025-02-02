import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import Typography from '../../components/Typography'
import Divider from '../../components/Divider'

const { Text, Title } = Typography

interface CardRowProps {
	main: string | React.ReactNode
	secondary: string | React.ReactNode
	rightContent?: string | React.ReactNode
	last?: boolean
}

const CardRow = (props: CardRowProps) => {
	const { main, secondary, rightContent, last } = props
	return (
		<StyledRow align={'middle'} last={last}>
			<Col span={rightContent ? 12 : 24}>
				<Text
					style={{
						margin: 0,
						marginLeft: 22,
						marginTop: 22,
						display: 'block',
					}}
					type="secondary"
				>
					{main}
				</Text>
				<Title
					style={{ margin: 0, marginLeft: 22, marginBottom: 22 }}
					level={5}
				>
					{secondary}
				</Title>
			</Col>
			{rightContent && <Col span={12}>{rightContent}</Col>}
		</StyledRow>
	)
}

export default CardRow

const StyledRow = styled(Row)<{ last: boolean }>`
	&&& {
		background: ${(props) => props.theme.secondary.background};
		border-color: ${(props) => props.theme.secondary.border};
		${(props) =>
			props.last
				? ''
				: `border-bottom: 2px solid ${props.theme.secondary.border};`}
	}
`
