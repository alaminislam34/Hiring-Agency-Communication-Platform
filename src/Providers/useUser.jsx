import { create } from "zustand";

const useUser = create((set) => ({
  fullName: "",
  setFullName: (name) => set({ fullName: name }),
}));

export default useUser;
