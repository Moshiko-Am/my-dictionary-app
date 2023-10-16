import React, { useRef } from 'react';
import { useAppContext } from '../../context/AppContext.tsx';
import Spinner from '../Spinner/Spinner.tsx';
import { generateBEMClassName } from 'bem-classnames-generator/dist';
import playIcon from '../../assets/images/icon-play.svg';
import linkIconSrc from '../../assets/images/icon-new-window.svg';
import MeaningComponent from './MeaningComponent.tsx';

interface IResultsComponent {}

const ResultsComponent: React.FC<IResultsComponent> = () => {
	const BEMBlock = 'results-component';

	const audioRef = useRef<HTMLAudioElement>(null);

	const { result, isLoading } = useAppContext();

	const handlePlay = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	console.log({ result });

	return (
		<div className={generateBEMClassName({ block: BEMBlock })}>
			{isLoading ? (
				<div className={generateBEMClassName({ block: BEMBlock, element: 'spinner-container' })}>
					<Spinner />
				</div>
			) : result === null ? (
				<div className={generateBEMClassName({ block: BEMBlock, element: 'no-results-container' })}>
					<span className={generateBEMClassName({ block: BEMBlock, element: 'no-results-icon' })}>😕</span>
					<h3 className={generateBEMClassName({ block: BEMBlock, element: 'no-results-header' })}>
						No Definitions Found
					</h3>
					<p className={generateBEMClassName({ block: BEMBlock, element: 'no-results-text' })}>
						Sorry pal, we couldn't find definitions for the word you were looking for. You can try the
						search again at later time or head to the web instead.
					</p>
				</div>
			) : Object.entries(result ?? {})?.length <= 0 ? (
				<div className={generateBEMClassName({ block: BEMBlock, element: 'empty-results-container' })}>
					Nothing to show yet. Try searching for a word.
				</div>
			) : (
				<div className={generateBEMClassName({ block: BEMBlock, element: 'results-content-wrapper' })}>
					<div className={generateBEMClassName({ block: BEMBlock, element: 'result-header' })}>
						<div className={generateBEMClassName({ block: BEMBlock, element: 'header-word-phonetic' })}>
							<h1 className={generateBEMClassName({ block: BEMBlock, element: 'word' })}>
								{result?.word}
							</h1>
							<p
								className={generateBEMClassName({
									block: BEMBlock,
									element: 'phonetic',
								})}
							>
								{result?.phonetic}
							</p>
						</div>
						<div className={generateBEMClassName({ block: BEMBlock, element: 'audio-container' })}>
							{result?.phonetics
								?.filter((phonetic) => phonetic?.audio)
								?.slice(0, 1)
								?.map((phonetic, index) => (
									<React.Fragment key={`phonetic-${index}`}>
										<button
											onClick={handlePlay}
											className={generateBEMClassName({
												block: BEMBlock,
												element: 'audio-button',
											})}
										>
											<img src={playIcon} />
										</button>
										<audio ref={audioRef} src={phonetic?.audio} />
									</React.Fragment>
								))}
						</div>
					</div>
					<div className={generateBEMClassName({ block: BEMBlock, element: 'result-meanings-wrapper' })}>
						{result?.meanings?.map((meaning, index) => (
							<MeaningComponent key={`meaning-${index}`} meaning={meaning} />
						))}
					</div>
					{result?.sourceUrls?.length > 0 && (
						<div className={generateBEMClassName({ block: BEMBlock, element: 'result-urls-container' })}>
							{result?.sourceUrls?.map((url, index) => (
								<div
									className={generateBEMClassName({ block: BEMBlock, element: 'result-url-item' })}
									key={`url-${index}`}
								>
									<p
										className={generateBEMClassName({
											block: BEMBlock,
											element: 'result-url-header',
										})}
									>
										Source
									</p>
									<a
										className={generateBEMClassName({
											block: BEMBlock,
											element: 'result-url',
										})}
										href={url}
										target={'_blank'}
									>
										{url}
									</a>
									<img
										src={linkIconSrc}
										alt={'go-to-new-window'}
										className={generateBEMClassName({
											block: BEMBlock,
											element: 'result-url-icon',
										})}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ResultsComponent;
