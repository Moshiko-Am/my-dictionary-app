import React from 'react';
import { useFormik } from 'formik';
import searchIcon from '../../assets/images/icon-search.svg';
import { useAppContext } from '../../context/AppContext.tsx';
import { generateBEMClassName } from 'bem-classnames-generator/dist';

interface IInputForm {
	bBlock?: string;
}

const InputForm: React.FC<IInputForm> = ({ bBlock }) => {
	const BEMBlock = bBlock ? [bBlock, 'input-form'] : 'input-form';

	const { query, setQuery } = useAppContext();

	const formik = useFormik({
		initialValues: {
			query: query ?? '',
		},
		onSubmit: (values) => {
			setQuery(values.query);
		},
		validate: (values) => {
			const errors: any = {};
			if (!values.query) {
				errors['query'] = 'Whoops, can’t be empty...';
			} else if (values.query.length > 30) {
				errors['query'] = 'Cannot be longer than 30 characters';
			}
			return errors;
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className={generateBEMClassName({ block: BEMBlock })}>
			<div
				className={generateBEMClassName({
					block: BEMBlock,
					element: 'input-wrapper',
					modifier: { name: 'error', condition: (!!formik?.touched?.query && !!formik?.errors?.query) },
				})}
			>
				<input
					type={'text'}
					name={'query'}
					onChange={formik.handleChange}
					value={formik.values.query}
					placeholder={'Search anything...'}
					className={generateBEMClassName({ block: BEMBlock, element: 'input' })}
				/>
				<div className={generateBEMClassName({ block: BEMBlock, element: 'icon-container' })}>
					<img
						src={searchIcon}
						alt={'Search Icon'}
						className={generateBEMClassName({ block: BEMBlock, element: 'search-icon' })}
						onClick={formik.handleSubmit}
					/>
				</div>
			</div>
			<div className={generateBEMClassName({ block: BEMBlock, element: 'error-container' })}>
				{formik?.touched?.query && formik?.errors?.query && <p>{formik.errors.query}</p>}
			</div>
		</form>
	);
};

export default InputForm;
