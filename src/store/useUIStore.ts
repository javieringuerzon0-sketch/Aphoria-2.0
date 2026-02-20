import { create } from 'zustand';

interface UIState {
    isCartOpen: boolean;
    isDiagnosticModalOpen: boolean;
    lastDiagnosticResult: 'gold' | 'avocado' | null;
    scrolled: boolean;

    // Actions
    setCartOpen: (open: boolean) => void;
    toggleCart: () => void;
    setScrolled: (scrolled: boolean) => void;
    setDiagnosticResult: (result: 'gold' | 'avocado' | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isCartOpen: false,
    isDiagnosticModalOpen: false,
    lastDiagnosticResult: null,
    scrolled: false,

    setCartOpen: (open) => set({ isCartOpen: open }),
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    setScrolled: (scrolled) => set({ scrolled }),
    setDiagnosticResult: (result) => set({ lastDiagnosticResult: result }),
}));
