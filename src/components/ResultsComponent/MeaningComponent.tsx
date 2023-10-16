import React from 'react';
import { generateBEMClassName } from 'bem-classnames-generator/dist';

interface IMeaningComponent {
	meaning: {
		antonyms: string[];
		definitions: {
			antonyms: string[];
			definition: string;
			synonyms: string[];
		}[];
		partOfSpeech: string;
		synonyms: string[];
	};
}

const MeaningComponent: React.FC<IMeaningComponent> = ({ meaning }) => {
	const BEMBlock = 'meaning-component';

	return (
		<div className={generateBEMClassName({ block: BEMBlock })}>
			<div className={generateBEMClassName({ block: BEMBlock, element: 'meaning-header' })}>
				<h2
					className={generateBEMClassName({
						block: BEMBlock,
						element: 'part-of-speech',
					})}
				>
					{meaning?.partOfSpeech}
				</h2>
				<span className={generateBEMClassName({ block: BEMBlock, element: 'header-separator' })} />
			</div>
			<div className={generateBEMClassName({ block: BEMBlock, element: 'definitions-container' })}>
				<h3 className={generateBEMClassName({ block: BEMBlock, element: 'definitions-header' })}>Meaning</h3>
				<div className={generateBEMClassName({ block: BEMBlock, element: 'definitions-list' })}>
					{meaning?.definitions?.map((definition, index) => (
						<div
							key={`definition-${index}`}
							className={generateBEMClassName({ block: BEMBlock, element: 'definition-item' })}
						>
							<span
								className={generateBEMClassName({
									block: BEMBlock,
									element: 'definition-bullet',
								})}
							/>
							<span
								className={generateBEMClassName({
									block: BEMBlock,
									element: 'definition-item-text',
								})}
							>
								{definition?.definition}
							</span>
						</div>
					))}
				</div>
			</div>
			{meaning?.synonyms?.length > 0 && (
				<div className={generateBEMClassName({ block: BEMBlock, element: 'synonyms-container' })}>
					<h3 className={generateBEMClassName({ block: BEMBlock, element: 'synonyms-header' })}>Synonyms</h3>
					{meaning?.synonyms?.map((synonym, index) => (
						<h3
							key={`synonym-${index}`}
							className={generateBEMClassName({
								block: BEMBlock,
								element: 'synonym-item',
							})}
						>
							{synonym}
						</h3>
					))}
				</div>
			)}
		</div>
	);
};

export default MeaningComponent;
