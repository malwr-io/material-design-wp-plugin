<?php
/**
 * Tests for Icon_Radio_Control class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

/**
 * Tests for Icon_Radio_Control class.
 */
class Test_Icon_Radio_Control extends \WP_UnitTestCase {
	/**
	 * Set up required includes.
	 *
	 * @see WP_UnitTestCase::setup()
	 */
	public function setUp() {
		parent::setUp();
		require_once ABSPATH . WPINC . '/class-wp-customize-manager.php';
		require_once ABSPATH . WPINC . '/class-wp-customize-control.php';
	}

	/**
	 * Test render_content.
	 *
	 * @see Icon_Radio_Control::render_content()
	 */
	public function test_render_content() {
		$wp_customize  = new \WP_Customize_Manager();
		$radio_control = new Icon_Radio_Control(
			$wp_customize,
			'material_theme_theme',
			[]
		);

		ob_start();
		$radio_control->render_content();
		$output = ob_get_clean();

		// Assert the control does not render if choices are not passed on or empty.
		$this->assertEmpty( $output );

		$radio_control = new Icon_Radio_Control(
			$wp_customize,
			'material_theme_theme',
			[
				'choices' => [
					'foo' => [
						'label' => 'Foo',
						'icon'  => 'http://example.com/foo.svg',
					],
					'bar' => [
						'label' => 'Bar',
						'icon'  => 'http://example.com/bar.svg',
					],
				],
			]
		);

		ob_start();
		$radio_control->render_content();
		$output = ob_get_clean();

		$this->assertContains( sprintf( 'value="%s"', 'foo' ), $output );
		$this->assertContains( sprintf( 'value="%s"', 'bar' ), $output );

		$this->assertContains( sprintf( 'src="%s"', 'http://example.com/foo.svg' ), $output );
		$this->assertContains( sprintf( 'src="%s"', 'http://example.com/bar.svg' ), $output );
	}

	/**
	 * Test to_json.
	 *
	 * @see Icon_Radio_Control::to_json()
	 */
	public function test_to_json() {
		$wp_customize = new \WP_Customize_Manager();

		$wp_customize->add_setting( 'mtb_icon_collection' );

		$primary_control = new Icon_Radio_Control(
			$wp_customize,
			'mtb_icon_collection',
			[
				'label'    => 'Icon Collection',
				'section'  => 'icon',
				'priority' => 10,
				'css_var'  => '--mdc-icon-font',
			]
		);

		$json = $primary_control->json();

		$this->assertEquals( 'icon_radio', $json['type'] );
		$this->assertEquals( '--mdc-icon-font', $json['cssVar'] );
	}
}