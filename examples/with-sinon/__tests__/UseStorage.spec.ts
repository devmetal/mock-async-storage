/* eslint-env jest */
import sinon from "sinon";
import MockAsyncStorage from "../../../lib/index.cjs";

import AsyncStorage from "../AsyncStorage";
import * as UseStorage from "../UseStorage";

const mock = new MockAsyncStorage();
sinon.stub(AsyncStorage, "setItem").callsFake(mock.setItem.bind(mock));
sinon.stub(AsyncStorage, "getItem").callsFake(mock.getItem.bind(mock));

it("Can save and get item with mocked storage", async () => {
  await UseStorage.save("test", "data");
  const test = await UseStorage.get("test");
  expect(test).toEqual("data");
});
