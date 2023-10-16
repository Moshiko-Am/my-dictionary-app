import React from 'react';
import { generateBEMClassName } from 'bem-classnames-generator/dist';
import InputForm from '../InputForm/InputForm.tsx';

interface IAppSearchBar {}

const AppSearchBar: React.FC<IAppSearchBar> = () => {
	const BEMBlock = 'app-search-bar';

	return (
		<div className={generateBEMClassName({ block: BEMBlock })}>
			<InputForm bBlock={BEMBlock} />
		</div>
	);
};

export default AppSearchBar;
