import { render, screen } from '@testing-library/react';

import MapView from '@/pages/mapview';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('MapView page', () => {
  describe('Render method', () => {
    it('should have two paragraphs of `Lorem ipsum`', () => {
      render(<MapView />);

      const paragraph = screen.getAllByText(/호선/);

      expect(paragraph).toHaveLength(9);
    });
  });
});
