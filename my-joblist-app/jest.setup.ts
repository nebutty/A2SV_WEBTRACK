// jest.setup.ts
import '@testing-library/jest-dom/extend-expect';

Object.defineProperty(window, 'localStorage', {
  value: (() => {
    let store: Record<string, string> = {};
    const mockStorage: Storage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      key: (index: number) => Object.keys(store)[index] || null,
      get length() {
        return Object.keys(store).length;
      }
    };
    return mockStorage;
  })(),
});
