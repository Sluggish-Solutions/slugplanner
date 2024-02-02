
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import test from "../../db/test.json" assert { type: 'json' };
import { courses, posts } from "~/server/db/schema";
interface PrerequisiteConditions {
  restricted_to_majors: string;
  erlw: boolean;
  lower_credits_limit: number;
  upper_credits_limit: number;
  "College 1": string;
  Concurrent: string;
}

interface PrerequisiteData {
  conditions: PrerequisiteConditions;
  text: string;
  courses: Array<Array<string>>;
}

interface QuarterlyInfo {
  total_seats: number;
  "filled seats": number;
  priority: string;
}

interface Course {
  name: string;
  title: string;
  description: string;
  pre_req_data: PrerequisiteData;
  class_notes: string | null;
  career: string;
  gen_ed_code: string | null;
  type: string;
  credits: string;
  quarters_offered: Array<string>;
  quarterly_info: {
    fall: QuarterlyInfo;
    spring: QuarterlyInfo;
  };
}

// Example usage:

export const coursesRouter = createTRPCRouter({
  insert_all_data_lmao: publicProcedure
    .mutation(async ({ ctx }) => {
      const lol = test as Course;

      await ctx.db.insert(courses).values({
        title: lol.title,
        dept_num: lol.name,
        description: lol.description
      })
    }),
});
