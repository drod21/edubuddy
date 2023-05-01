import type { Database } from "./db";

type Tables = Database["public"]["Tables"];
export type Education = Tables["education"]["Row"];
export type User = Tables["user"]["Row"];
export type UserMetadata = Tables["user_metadata"]["Row"];
export type Category = Tables["categories"]["Row"];
export type Subject = Tables["subjects"]["Row"];
export type Activity = Tables["activities"]["Row"];
