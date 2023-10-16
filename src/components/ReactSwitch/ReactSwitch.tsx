import React from 'react';
import Switch from 'react-switch';

interface IReactSwitch {
	checked: boolean;
	onChange: () => void;
	onColor?: string;
	offColor?: string;
}

const ReactSwitch: React.FC<IReactSwitch> = ({ checked, onChange, onColor, offColor }) => {
	return (
		<Switch
			checked={checked}
			onChange={onChange}
			onColor={onColor ?? '#a445ed'}
			offColor={offColor ?? '#979797'}
			checkedIcon={false}
			uncheckedIcon={false}
			offHandleColor={'#e9e9e9'}
			onHandleColor={'#e9e9e9'}
		/>
	);
};

export default ReactSwitch;
