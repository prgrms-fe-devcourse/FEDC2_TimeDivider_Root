import { themeColors } from '../../../shared/constants/colors'
import Button from '../../../shared/components/Button'

export const ToolBarButton = ({ children, reversed = false, ...props }) => (
	<Button
		width={6.3}
		height={2.7}
		fontSize={1.3}
		backgroundColor={reversed ? themeColors.primary : themeColors.background}
		fontColor={reversed ? themeColors.fontReversed : themeColors.primary}
		style={{ lineHeight: '1rem', boxShadow: 'none' }}
		{...props}
	>
		{children}
	</Button>
)
