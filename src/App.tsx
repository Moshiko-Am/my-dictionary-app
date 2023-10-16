import { generateBEMClassName } from 'bem-classnames-generator/dist';
import AppHeader from './components/AppHeader/AppHeader.tsx';
import { AppProvider } from './context/AppContext.tsx';
import ResultsComponent from './components/ResultsComponent/ResultsComponent.tsx';
import AppSearchBar from './components/AppSearchBar/AppSearchBar.tsx';

function App() {
	return (
		<AppProvider>
			<div className={generateBEMClassName({ block: 'content-wrapper' })}>
				<AppHeader />
				<main className={generateBEMClassName({ block: 'content-wrapper', element: 'content' })}>
					<AppSearchBar />
					<ResultsComponent />
				</main>
			</div>
		</AppProvider>
	);
}

export default App;
