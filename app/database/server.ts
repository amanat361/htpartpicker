import { QueryError, createClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/database.types";
import type { Table, Result } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const createGetter = <
  T extends Table,
  Q extends Tables<T>,
  C extends string & keyof Q
>(
  table: T,
  args?: {
    mutator?: (res: Q[]) => Q[];
    order?: { by: string; ascending: boolean };
    eq?: { key: C; value: NonNullable<Q[C]> };
  }
) => {
  const { mutator, order, eq } = args ?? {};
  let query = supabase.from(table).select("*");
  if (order) query = query.order(order.by, { ascending: order.ascending });
  if (eq) query = query.eq(eq.key, eq.value);
  const getter = async (): Promise<{
    data: Q[];
    result: Result;
  }> => {
    const { data, error } = (await query.returns<Q[]>()) as {
      data: Q[] | null;
      error: QueryError | null;
    };
    if (error)
      return { data: [], result: { message: error.message, hasError: true } };
    if (!data)
      return {
        data: [],
        result: { message: "No data returned", hasError: false },
      };
    if (mutator)
      return {
        data: mutator(data),
        result: {
          message: "Data fetched successfully and mutated",
          hasError: false,
        },
      };
    return {
      data,
      result: { message: "Data fetched successfully", hasError: false },
    };
  };
  return getter;
};

export const createSetter = <
  T extends Table,
  Q extends Tables<T>,
  I extends Database["public"]["Tables"][T]["Insert"]
>(
  table: T,
  mutator?: (res: Q[]) => Q[]
) => {
  const query = supabase.from(table);
  const setter = async (
    rows: I[]
  ): Promise<{
    data: Q[];
    result: Result;
  }> => {
    for (const row of rows) {
      for (const key in row) {
        if (!row[key])
          return {
            data: [],
            result: {
              message: `Invalid value for ${key}`,
              hasError: true,
            },
          };
      }
    }
    const { data, error } = (await query
      .insert(rows as any)
      .returns<Q[]>()) as {
      data: Q[] | null;
      error: QueryError | null;
    };
    if (error)
      return {
        data: [],
        result: {
          message: error.message,
          hasError: true,
        },
      };
    if (!data)
      return {
        data: [],
        result: {
          message: "No data returned",
          hasError: false,
        },
      };
    if (mutator)
      return {
        data: mutator(data),
        result: {
          message: "Data inserted successfully and mutated",
          hasError: false,
        },
      };
    return {
      data,
      result: {
        message: "Data inserted successfully",
        hasError: false,
      },
    };
  };
  return setter;
};

export const createDeleter = <T extends Table, Q extends Tables<T>>(
  table: T
) => {
  const query = supabase.from(table);
  const deleter = async (id: string): Promise<Result> => {
    const { error } = await query.delete().eq("id", id);
    if (error)
      return {
        message: `Error deleting ${table}.+Supabase says: ${error.message}`,
        hasError: true,
      };
    return { message: `${table} deleted successfully`, hasError: false };
  };
  return deleter;
};