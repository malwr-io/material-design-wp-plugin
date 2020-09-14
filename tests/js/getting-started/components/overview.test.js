/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Overview } from '../../../../assets/src/getting-started/components/content/overview';
import { TabProvider } from '../../../../assets/src/getting-started/context';

const setup = () => {
	return render(
		<TabProvider>
			<Overview />
		</TabProvider>
	);
};

describe( 'GSM: Overview', () => {
	beforeAll( () => {
		global.mtbGsm = {
			themeStatus: 'ok',
			contentStatus: 'ok',
		};
	} );

	afterEach( cleanup );

	it( 'matches snapshot', () => {
		const wrapper = setup();
		expect( wrapper ).toMatchSnapshot();
	} );
} );