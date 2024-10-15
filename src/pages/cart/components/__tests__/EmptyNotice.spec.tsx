import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import render from '@/utils/test/render';
import { ErrorPage } from '@/pages/error/components/ErrorPage';
import { useNavigate } from 'react-router-dom';

// useNavigate 및 MemoryRouter 모킹
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === 'object' ? actual : {}), // actual이 객체일 때만 스프레드
    useNavigate: vi.fn(), // useNavigate 함수 모킹
    MemoryRouter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div> // MemoryRouter 모킹
    ),
  };
});

it('"뒤로 이동" 버튼 클릭 시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
  // Arrange: 모킹된 navigate 함수 설정
  const navigate = vi.fn(); // navigate 함수 모킹
  (useNavigate as jest.Mock).mockReturnValue(navigate); // useNavigate 호출 시 모킹된 navigate 반환

  // ErrorPage 컴포넌트를 렌더링
  const { user } = await render(<ErrorPage />);

  // Act: "뒤로 이동" 버튼 클릭
  const backButton = screen.getByRole('button', { name: /뒤로 이동/i }); // 버튼 요소 선택
  await user.click(backButton); // 버튼 클릭 이벤트 발생

  // Assert: navigate 함수가 -1 인자로 호출되었는지 확인
  expect(navigate).toHaveBeenCalledWith(-1); // navigate 함수 호출 여부 확인
});
