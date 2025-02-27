/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import {loadSiteConfig} from '../config';

describe('loadSiteConfig', () => {
  const siteDir = path.join(__dirname, '__fixtures__', 'configs');

  it('website with valid siteConfig', async () => {
    const config = await loadSiteConfig({
      siteDir: path.join(__dirname, '__fixtures__', 'simple-site'),
    });
    expect(config).toMatchSnapshot();
    expect(config).not.toEqual({});
  });

  it('website with valid config creator function', async () => {
    const config = await loadSiteConfig({
      siteDir,
      customConfigFilePath: 'createConfig.config.js',
    });
    expect(config).toMatchSnapshot();
    expect(config).not.toEqual({});
  });

  it('website with valid async config', async () => {
    const config = await loadSiteConfig({
      siteDir,
      customConfigFilePath: 'configAsync.config.js',
    });
    expect(config).toMatchSnapshot();
    expect(config).not.toEqual({});
  });

  it('website with valid async config creator function', async () => {
    const config = await loadSiteConfig({
      siteDir,
      customConfigFilePath: 'createConfigAsync.config.js',
    });
    expect(config).toMatchSnapshot();
    expect(config).not.toEqual({});
  });

  it('website with incomplete siteConfig', async () => {
    await expect(
      loadSiteConfig({
        siteDir: path.join(__dirname, '__fixtures__', 'bad-site'),
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
            "\\"url\\" is required
            "
          `);
  });

  it('website with useless field (wrong field) in siteConfig', async () => {
    await expect(
      loadSiteConfig({
        siteDir: path.join(__dirname, '__fixtures__', 'wrong-site'),
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
            "These field(s) (\\"useLessField\\",) are not recognized in docusaurus.config.js.
            If you still want these fields to be in your configuration, put them in the \\"customFields\\" field.
            See https://docusaurus.io/docs/api/docusaurus-config/#customfields"
          `);
  });

  it('website with no siteConfig', async () => {
    await expect(
      loadSiteConfig({
        siteDir: path.join(__dirname, '__fixtures__', 'nonExisting'),
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Config file at \\"<PROJECT_ROOT>/packages/docusaurus/src/server/__tests__/__fixtures__/nonExisting/docusaurus.config.js\\" not found."`,
    );
  });
});
