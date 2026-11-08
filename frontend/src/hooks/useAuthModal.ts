// store/useAuthModal.ts
import { AuthModalStore } from '@/types/auth.type';
import { create } from 'zustand';


export const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    view: 'login',
    openModal: (view) => set({ isOpen: true, view }),
    closeModal: () => set({ isOpen: false }),
}));
