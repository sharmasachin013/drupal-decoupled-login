<?php

declare(strict_types=1);

namespace Drupal\Tests\node\Functional;

/**
 * Tests if the syndicate block is available.
 *
 * @group node
 * @group legacy
 */
class NodeSyndicateBlockTest extends NodeTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['block'];

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();

    // Create a user and log in.
    $admin_user = $this->drupalCreateUser(['administer blocks']);
    $this->drupalLogin($admin_user);
  }

  /**
   * Tests that the "Syndicate" block is shown when enabled.
   */
  public function testSyndicateBlock(): void {
    // Place the "Syndicate" block and confirm that it is rendered.
    $this->drupalPlaceBlock('node_syndicate_block', ['id' => 'test_syndicate_block', 'label' => 'Subscribe to RSS Feed']);
    $this->drupalGet('');
    $this->assertSession()->elementExists('xpath', '//div[@id="block-test-syndicate-block"]/*');
    $this->expectDeprecation('The Syndicate block is deprecated in drupal:11.2.0 and will be removed from drupal:12.0.0. There is no replacement. See https://www.drupal.org/node/3519248');

    // Verify syndicate block title.
    $this->assertSession()->pageTextContains('Subscribe to RSS Feed');
    // Tests the syndicate block RSS link rendered at non-front pages.
    $this->drupalGet('user');
    $this->clickLink('Subscribe to');
    $this->assertSession()->addressEquals('rss.xml');
  }

}
