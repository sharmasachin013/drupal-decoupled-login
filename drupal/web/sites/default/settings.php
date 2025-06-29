<?php

$settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config';

$settings['oauth2_server.private_key'] = '/var/www/html/public.key';
$settings['oauth2_server.public_key'] = '/var/www/html/public.key';


$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';

// #ddev-generated: Automatically generated Drupal settings file.
if (file_exists($app_root . '/' . $site_path . '/settings.ddev.php') && getenv('IS_DDEV_PROJECT') == 'true') {
  include $app_root . '/' . $site_path . '/settings.ddev.php';
}

$settings['reverse_proxy'] = TRUE;
$settings['reverse_proxy_addresses'] = array($_SERVER['REMOTE_ADDR']);
