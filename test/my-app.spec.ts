import { describe, it } from 'vitest';
import { Boggling } from '../src/boggling';
import { createFixture } from '@aurelia/testing';

describe('boggling', () => {
  it('should render message', async () => {
    const { assertText } = await createFixture(
      '<boggling></boggling>',
      {},
      [Boggling],
    ).started;

    assertText('Hello World!', { compact: true });
  });

});
