import styled from 'styled-components'
import { colors, themeColors } from '../../shared/constants/colors'
import Text from '../../shared/components/Text'

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	padding-top: 8.6rem;
	background-color: ${themeColors.labelBackground};
`
export const Profiles = styled.div`
	display: flex;
	width: 100%;
	height: 24rem;
	flex-direction: column;
	align-items: center;
	row-gap: 1rem;
`
export const Avatar = styled.div`
	width: ${props => props.size}rem;
	height: ${props => props.size}rem;
	background: no-repeat top center url('${props => props.src}');
	background-size: cover;
	border-radius: 50%;
`
export const Settings = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`
export const Setting = styled.div`
	box-sizing: border-box;
	display: flex;
	column-gap: 1rem;
	width: 33.3rem;
	height: 5rem;
	border-radius: 1.1rem;
	align-items: center;
	padding: 1.5rem;
	background-color: ${colors.white};
`
export const Icon = styled(Text)`
	display: block;
	width: 2rem;
	height: 2rem;
`
export const Title = styled(Text)`
	display: block;
	flex: 1;
`
