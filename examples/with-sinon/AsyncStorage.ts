/* eslint-disable @typescript-eslint/no-unused-vars */
export default {
  setItem(k: string, v: string) {
    return Promise.resolve();
  },
  getItem(k: string): Promise<string | null> {
    return Promise.resolve("");
  },
};
