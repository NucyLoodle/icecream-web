import { render, screen } from '@testing-library/react';


import dynamic from 'next/dynamic';

const LoginPage = dynamic(() => import('@/app/login'), { ssr: false }); //handle the use client



describe("login page component", () => {
    it("renders correctly", () => {
        render(<LoginPage />);
        expect(screen).toBeDefined();
    });
});