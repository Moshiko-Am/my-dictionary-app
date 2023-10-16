import React from 'react';
import { generateBEMClassName } from 'bem-classnames-generator/dist';
import { useAppContext } from '../../context/AppContext.tsx';
import ReactSwitch from '../ReactSwitch/ReactSwitch.tsx';
import ReactSelect from '../ReactSelect/ReactSelect.tsx';

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
	const BEMBlock = 'app-header';

	const { theme, toggleTheme, font: appFont, setFont } = useAppContext();

	const fontSelections = [
		{ value: 'roboto', label: 'Sans Serif' },
		{ value: 'merriweather', label: 'Serif' },
		{ value: 'ibm', label: 'Mono' },
	];

	return (
		<header className={generateBEMClassName({ block: BEMBlock })}>
			<div className={generateBEMClassName({ block: BEMBlock, element: 'logo-container' })}>
				<img src='/src/assets/images/logo.svg' alt='logo' />
			</div>
			<div className={generateBEMClassName({ block: BEMBlock, element: 'actions-container' })}>
				<ReactSelect
					options={fontSelections}
					value={fontSelections.find((font) => font.value === appFont)?.label}
					onChange={(newValue) => {
						setFont(newValue.value);
					}}
				/>
				<div className={generateBEMClassName({ block: BEMBlock, element: 'dark-mode-container' })}>
					<ReactSwitch checked={theme === 'dark'} onChange={toggleTheme} />
					<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22'>
						<path
							style={{ transition: 'all 250ms ease-in-out' }}
							fill='none'
							stroke={theme === 'dark' ? 'var(--general-accent)' : '#838383'}
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.5'
							d='M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z'
						/>
					</svg>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
