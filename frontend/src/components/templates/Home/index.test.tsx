import { render } from '@testing-library/react';
import HomeTemplate from '.';

const headerContent = <div data-testid="header">Header Content</div>;
const sidebarContent = (
  <div data-testid="sidebar">Sidebar Content</div>
);
const mainContent = <div data-testid="main">Main Content</div>;

test('Home Template', async () => {
  const { container } = render(
    <HomeTemplate
      header={headerContent}
      sidebar={sidebarContent}
      mainContent={mainContent}
    />
  );

  expect(container).toBeInTheDocument();
});
