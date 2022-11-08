import create from "zustand";
import { persist } from "zustand/middleware";
import { urlPath } from "../urlPath";

export interface UserStoreType {
  name: string;
  lastName: string;
  email: string;
  image: string;
  update: () => Promise<void>;
}

export const useUserStore = create(
  persist<UserStoreType>(
    (set) => ({
      name: "",
      lastName: "",
      email: "",
      image: "",
      update: async () => {
        const res = await fetch(`${urlPath}/api/user`);
        const { firstName, lastName, email, image } = await res.json();

        if (res.status === 200)
          set({ name: firstName, lastName, email, image });
      },
      remove: () => {
        set({ name: "", lastName: "", email: "", image: "" });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
