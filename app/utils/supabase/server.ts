import { QueryData, QueryError, createClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/database.types";
import type { Table } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const createGetter = <T extends Table, Q extends Tables<T>>(
  table: T,
  mutator?: (res: Q[]) => Q[]
) => {
  const query = supabase.from(table).select("*").returns<Q[]>();
  const getter = async () => {
    const { data, error } = await query;
    if (error) return [];
    return mutator ? mutator(data) : data;
  };
  return getter;
};
