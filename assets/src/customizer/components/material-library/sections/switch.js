import { __ } from '@wordpress/i18n';

const Switch = () => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Switch', 'material-theme-builder' ) }
		</h4>
		<p>
			{ __(
				'Switches toggle the state of a single setting on or off. It is unavailable as a block in WordPress.',
				'material-theme-builder'
			) }
		</p>
		<a href="https://material.io/develop/web/components/input-controls/switches" target="_blank">
		    <span class="material-icons">open_in_new</span>
		</a>
		<br/>
		<div className="mdc-switch" style={ { marginTop: '2px' } }>
			<div className="mdc-switch__track"></div>
			<div className="mdc-switch__thumb-underlay">
				<div className="mdc-switch__thumb"></div>
				<input
					type="checkbox"
					id="basic-switch"
					className="mdc-switch__native-control"
					role="switch"
					aria-checked="false"
				/>
			</div>
		</div>
	</div>
);

export default Switch;
