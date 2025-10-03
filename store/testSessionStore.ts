import { TestSessionT } from "@/types/test.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  fromCategoryStore: boolean;
  addFromCategoryStore: (value: boolean) => void;
  testSessionStore: TestSessionT | null;
  addTestSessionStore: (session: TestSessionT) => void;
};

const useTestSessionStore = create<State>()(
  persist(
    (set) => ({
      fromCategoryStore: false,
      addFromCategoryStore: (value) =>
        set(() => ({ fromCategoryStore: value })),
      testSessionStore: null,
      addTestSessionStore: (session) =>
        set(() => ({ testSessionStore: session })),
    }),
    {
      name: "test-session-storage",
      partialize: (state) => ({ hello: state.testSessionStore }),
    }
  )
);

export default useTestSessionStore;
