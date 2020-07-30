/* global jQuery, mtb, mdc */

/**
 * External dependencies
 */
import { camelCase, debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { render } from '@wordpress/element';
import { unmountComponentAtNode } from 'react-dom';

/**
 * Internal dependencies
 */
import MaterialLibrary from './components/material-library';
import {
	initButtons,
	initTabBar,
	initLists,
} from '../common/mdc-components-init';
import ThemePrompt from './components/theme-prompt';
import { THEME_COLOR_CONTROLS, removeOptionPrefix } from './utils';

const $ = jQuery;
const api = wp.customize;

// Material Library button
const BUTTON_OPEN_TEXT = __( 'Material Library', 'material-theme-builder' );
const BUTTON_CLOSE_TEXT = __( 'Exit Library', 'material-theme-builder' );

/**
 * Renders the material library with all the settings.
 */
const renderMaterialLibrary = () => {
	render(
		<MaterialLibrary { ...getSettings() } />,
		$( '#mcb-material-library-preview' ).get( 0 )
	);

	initMaterialComponents();
};

export const reRenderMaterialLibrary = debounce( () => {
	const materialLibrary = $( '#mcb-material-library-preview' );

	if (
		materialLibrary.get( 0 ) &&
		unmountComponentAtNode( materialLibrary.get( 0 ) )
	) {
		renderMaterialLibrary();
	}
}, 500 );

/**
 * Gets all the controls' setting
 * values and returns them in an object.
 */
const getSettings = () => {
	const controlProps = {
		theme: api.settings?.theme?.stylesheet,
	};

	if (
		! mtb.controls ||
		! mtb.controls.length ||
		! Array.isArray( mtb.controls )
	) {
		return controlProps;
	}

	mtb.controls
		.concat( THEME_COLOR_CONTROLS.map( name => `material_${ name }` ) )
		.concat( radiusControls )
		.forEach( name => {
			const setting = api( name );

			if ( setting ) {
				const prop = camelCase( removeOptionPrefix( name ) );
				let value = setting.get();

				if ( radiusControlsLookup.hasOwnProperty( name ) ) {
					value = Number( limitRadiusValue( name, value ) );
				}

				controlProps[ prop ] = value;
			}
		} );

	return controlProps;
};

const limitRadiusValue = ( id, value ) => {
	if (
		radiusControlsLookup[ id ]?.max &&
		value > radiusControlsLookup[ id ].max
	) {
		value = radiusControlsLookup[ id ].max;
	} else if (
		radiusControlsLookup[ id ]?.min &&
		value < radiusControlsLookup[ id ].min
	) {
		value = radiusControlsLookup[ id ].min;
	}

	return value;
};

const initMaterialComponents = function() {
	initButtons();
	initTabBar();
	initLists();

	try {
		const states = [
			{ state: 'checked', value: false },
			{ state: 'checked', value: true },
			{ state: 'indeterminate', value: true },
			{ state: 'disabled', value: true },
		];

		document.querySelectorAll( '.mdc-checkbox' ).forEach( ( chkbox, index ) => {
			const checkbox = new mdc.checkbox.MDCCheckbox( chkbox );
			checkbox[ states[ index ].state ] = states[ index ].value;
		} );

		document
			.querySelectorAll( '.mdc-radio' )
			.forEach( radio => new mdc.radio.MDCRadio( radio ) );

		document
			.querySelectorAll( '.mdc-text-field' )
			.forEach( txtField => new mdc.textField.MDCTextField( txtField ) );

		const chipSetEl = document.querySelector( '.mdc-chip-set' );
		new mdc.chips.MDCChipSet( chipSetEl );

		new mdc.switchControl.MDCSwitch( document.querySelector( '.mdc-switch' ) );
	} catch ( err ) {}
};

const toggleMaterialLibrary = () => {
	let materialLibrary = $( '#mcb-material-library-preview' );
	const customizePreview = $( '#customize-preview' );
	const toggleButton = $( '.toggle-material-library' );

	// Toggle between material library and default customizer view.
	if ( ! materialLibrary.is( ':visible' ) ) {
		if ( ! materialLibrary.length ) {
			customizePreview.before(
				$( '<div></div>' )
					.attr( { id: 'mcb-material-library-preview' } )
					.addClass( 'wp-full-overlay-main' )
			);

			materialLibrary = $( '#mcb-material-library-preview' );
		}

		$( this ).addClass( 'active' );
		renderMaterialLibrary();

		customizePreview.hide();
		materialLibrary.show();
		toggleButton.text( BUTTON_CLOSE_TEXT );
	} else {
		$( this ).removeClass( 'active' );
		materialLibrary.hide();
		customizePreview.show();
		toggleButton.text( BUTTON_OPEN_TEXT );
	}
};

$( '.customize-pane-parent' ).ready( function() {
	if ( window.localStorage.getItem( 'themeInstallerDismissed' ) !== null ) {
		return;
	}

	$( '.customize-pane-parent' ).prepend( `
		<li id="accordion-section-theme-installer" class="accordion-section control-panel-themes customize-info"></li>
	` );

	render(
		<ThemePrompt status={ mtb.themeStatus } />,
		$( '#accordion-section-theme-installer' ).get( 0 )
	);
} );

/**
 * Show/hide material library button near the "Publish" button.
 */
$( '#customize-save-button-wrapper' ).ready( function() {
	$( '#customize-save-button-wrapper' ).prepend(
		$( '<button></button>' )
			.attr( { type: 'button' } )
			.css( 'display', 'none' )
			.addClass( 'button toggle-material-library' )
			.text( BUTTON_OPEN_TEXT )
	);

	api.panel( mtb.slug ).expanded.bind( function( expanded ) {
		const showOrHide = expanded ? 'block' : 'none';
		$( '.toggle-material-library' ).css( 'display', showOrHide );

		if ( ! expanded && $( '#mcb-material-library-preview' ).is( ':visible' ) ) {
			toggleMaterialLibrary();
		}
	} );
} );

/**
 * Handle the material library swap right here.
 */
let mdcLoaded = false;
let radiusControls = [];
const radiusControlsLookup = {};

export const loadMaterialLibrary = () => {
	// Load MDC assets
	if ( ! mdcLoaded ) {
		$( 'head' ).prepend( `
			<link href="https://unpkg.com/material-components-web@v5.1.0/dist/material-components-web.min.css" rel="stylesheet">
			<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
		` );

		$.getScript(
			'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js',
			initMaterialComponents
		);

		const globalRadiusControl = api.control( `${ mtb.slug }_global_radius` );

		if ( globalRadiusControl?.params?.children ) {
			globalRadiusControl.params.children.forEach(
				ctrl =>
					( radiusControlsLookup[ ctrl.id ] = {
						min: ctrl.min,
						max: ctrl.max,
					} )
			);

			radiusControls = Object.keys( radiusControlsLookup );
		}
	}

	toggleMaterialLibrary();

	mdcLoaded = true;
};