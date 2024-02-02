import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "~/env";
import * as schema from "./schema";

export const db = drizzle(
  new Client({
    url: env.DATABASE_URL,
  }).connection(),
  { schema }
);


export type Course = {
  dept_num: string;
  title: string;
  description: string;
  pre_req_data: {
    conditions: {
      restricted_to_majors: string;
      erlw: boolean;
      lower_credits_limit: number;
      upper_credits_limit: number;
      "College 1": string;
      Concurrent: string;
    };
    text: string;
    courses: Array<Array<string>>;
  };
  class_notes: string | null;
  career: string;
  gen_ed_code: string | null;
  type: string;
  credits: string;
  quarters_offered: Array<string>;
  quarterly_info: {
    fall: {
      total_seats: number;
      filled_seats: number;
      priority: string;
    };
    spring: {
      total_seats: number;
      filled_seats: number;
      priority: string;
    };
  };
};
