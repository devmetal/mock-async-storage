/* eslint-env jest */
jest.mock('../AsyncStorage');

import * as UseStorage from '../UseStorage';

it('Can save and get item with mocked storage', async () => {
  await UseStorage.save('test', 'data');
  const test = await UseStorage.get('test');
  expect(test).toEqual('data');  
});
