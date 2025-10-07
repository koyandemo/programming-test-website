import { type TestSessionT, TestViewEnum } from "@/types/test.type"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  fromCategoryStore: boolean
  addFromCategoryStore: (value: boolean) => void
  testSessionStore: TestSessionT | null
  addTestSessionStore: (session: TestSessionT) => void
  currentView: TestViewEnum
  setCurrentView: (view: TestViewEnum) => void
}

const useTestSessionStore = create<State>()(
  persist(
    (set) => ({
      fromCategoryStore: false,
      addFromCategoryStore: (value) => set(() => ({ fromCategoryStore: value })),
      testSessionStore: null,
      addTestSessionStore: (session) => set(() => ({ testSessionStore: session })),
      currentView: TestViewEnum.SELECTION,
      setCurrentView: (view) => set(() => ({ currentView: view })),
    }),
    {
      name: "test-session-storage",
      partialize: (state) => ({ hello: state.testSessionStore }),
    },
  ),
)

export default useTestSessionStore
