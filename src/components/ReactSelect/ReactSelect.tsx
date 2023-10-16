import React from 'react';
import Select, { ActionMeta, GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import { useAppContext } from '../../context/AppContext.tsx';

interface IReactSelect {
	options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
	value: any;
	onChange: ((newValue: any) => void) | undefined;
}

const ReactSelect: React.FC<IReactSelect> = ({ options, value, onChange }) => {
	const { theme } = useAppContext();

	const customStyles: StylesConfig<any, false, GroupBase<unknown>> | undefined = {
		container: (provided) => ({
			...provided,
			width: '140px',
			borderRadius: 16,
			outline: 'none',
			border: 'none',

		}),
		control: (provided) => ({
			...provided,
			backgroundColor: 'transparent',
			outline: 'none',
			border: 'none',
			':hover': {
				border: 'none',
				cursor: 'pointer',
			}
		}),
		valueContainer: (provided) => ({
			...provided,
			outline: 'none',
			border: 'none',
			fontWeight: 700,
			backgroundColor: 'transparent',
			color: theme === 'dark' ? 'var(--dark-text-primary)': 'var(--light-text-primary)',
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: theme === 'dark' ? '#1f1f1f' : '#fff',
			borderRadius: 16,
			boxShadow: theme === 'dark' ? '0px 0px 16px rgba(164, 69, 237 , 1)' : '0px 0px 16px rgba(0, 0, 0 , 0.25)',
			fontWeight: 700,
		}),
		placeholder: (provided) => ({
			...provided,
			color: theme === 'dark' ? 'var(--dark-text-primary)': 'var(--light-text-primary)',
		}),
		indicatorSeparator: (provided) => ({
			...provided,
			display: 'none',
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? 'var(--general-accent)' : 'transparent',
			color: state.isSelected ? '#fff' : theme === 'dark' ? '#fff' : '#000',
			transition: 'all 250ms ease-in-out',
			':hover': {
				color: 'var(--general-accent)',
				cursor: 'pointer',
			}
		}),
		dropdownIndicator: (provided) => ({
			...provided,
			color: 'var(--general-accent)',
			':hover': {
				color: 'var(--general-accent)',
			}
		}),
	};

	return (
		<Select
			options={options}
			value={value}
			onChange={onChange}
			placeholder={value ?? 'Select'}
			styles={customStyles}
		/>
	);
};

export default ReactSelect;
