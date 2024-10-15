import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import customRender from '@/utils/test/render';
import { NotFoundPage } from '@/pages/error/components/NotFoundPage';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '@/apiRoutes';

// `useNavigate` 및 `MemoryRouter` 모킹
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === 'object' ? actual : {}),
    useNavigate: vi.fn(),
  };
});

it('Home으로 이동 버튼 클릭 시 홈 경로로 이동하는 navigate가 실행된다', async () => {
  // Arrange: 모킹된 navigate 함수 설정
  const navigate = vi.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);

  // NotFoundPage 컴포넌트를 customRender로 렌더링
  const { user } = await customRender(<NotFoundPage />);

  // Act: "Home으로 이동" 버튼 클릭
  const homeButton = screen.getByRole('button', { name: /Home으로 이동/i });
  await user.click(homeButton);

  // Assert: navigate 함수가 '/' 경로와 { replace: true } 옵션으로 호출되었는지 확인
  expect(navigate).toHaveBeenCalledWith(pageRoutes.main, { replace: true });
});
