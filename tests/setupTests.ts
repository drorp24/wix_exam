import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// expect.extend(matchers);

global.console = {
    ...console,
    warn: vi.fn(),
    error: vi.fn(),
};
