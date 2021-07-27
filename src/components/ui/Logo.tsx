import logoImage from '../../assets/images/clever-logo.png';

export const Logo = ({
	width = '20%',
	height = 'auto'
}: {
	width?: string;
	height?: string;
}) => {
	return (
		<img
			className="logo"
			src={logoImage}
			alt="Clever Logo"
			style={{ width, height }}
		/>
	);
};
