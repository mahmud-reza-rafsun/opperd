export type AuthModalStore = {
    isOpen: boolean;
    view: 'login' | 'register';
    openModal: (view: 'login' | 'register') => void;
    closeModal: () => void;
}
