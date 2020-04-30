/**
 * Internal dependencies
 */
import {
	name,
	settings,
} from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/message-input-field';
import BlockIcon from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/message-input-field/block-icon';
import Edit from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/textarea-input-edit';
import Save from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/textarea-input-save';

describe( 'blocks: material/message-input-field', () => {
	describe( 'name', () => {
		it( 'should equal material/message-input-field', () => {
			expect( name ).toStrictEqual( 'material/message-input-field' );
		} );
	} );

	describe( 'title settings', () => {
		it( 'should equal Message', () => {
			expect( settings.title ).toStrictEqual( 'Message' );
		} );
	} );

	describe( 'description settings', () => {
		it( 'should equal `Let folks speak their mind. This text box is great for longer responses.`', () => {
			expect( settings.description ).toStrictEqual(
				'Let folks speak their mind. This text box is great for longer responses.'
			);
		} );
	} );

	describe( 'parent settings', () => {
		it( 'should have a list of allowed parent blocks', () => {
			expect( settings.parent ).toStrictEqual( [ 'material/contact-form' ] );
		} );
	} );

	describe( 'category settings', () => {
		it( 'should equal material', () => {
			expect( settings.category ).toStrictEqual( 'material' );
		} );
	} );

	describe( 'icon settings', () => {
		it( 'should be equal to the BlockIcon component', () => {
			expect( settings.icon ).toStrictEqual( BlockIcon );
		} );
	} );

	describe( 'attributes', () => {
		it( 'should be a structured object', () => {
			expect( settings.attributes ).toStrictEqual( {
				id: {
					type: 'string',
				},
				label: {
					type: 'string',
					default: 'Message',
				},
				inputValue: {
					type: 'string',
				},
				inputRole: {
					type: 'string',
					default: 'message',
				},
				isRequired: {
					type: 'boolean',
					default: true,
				},
				outlined: {
					type: 'boolean',
					default: true,
				},
				fullWidth: {
					type: 'boolean',
					default: true,
				},
				displayLabel: {
					type: 'boolean',
					default: true,
				},
			} );
		} );
	} );

	describe( 'settings edit property', () => {
		it( 'should be equal to the Edit component', () => {
			expect( settings.edit ).toStrictEqual( Edit );
		} );
	} );

	describe( 'settings save property', () => {
		it( 'should be equal to the Save component', () => {
			expect( settings.save ).toStrictEqual( Save );
		} );
	} );
} );