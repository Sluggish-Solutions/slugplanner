
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { courses, posts } from "~/server/db/schema";
import type { Course } from "~/server/db";
import * as fs from 'fs';
import * as path from 'path';
type FileNameParts = {
  prefix: string;
  numericPart?: string;
};

function customSort(a: string, b: string): number {
  const pattern = /^([^\d]+)(\d+)?/; // Match the non-numeric and numeric parts in the string
  const matchA = a.match(pattern);
  const matchB = b.match(pattern);

  function extractFileNameParts(match: RegExpMatchArray | null): FileNameParts {
    return {
      prefix: match ? match[1] : '',
      numericPart: match ? match[2] : undefined,
    };
  }

  const partsA = extractFileNameParts(matchA);
  const partsB = extractFileNameParts(matchB);

  const prefixComparison = partsA.prefix.localeCompare(partsB.prefix); // Compare prefixes
  if (prefixComparison !== 0) {
    return prefixComparison;
  }

  const numA = partsA.numericPart ? parseInt(partsA.numericPart) : 0; // Convert numeric part to number
  const numB = partsB.numericPart ? parseInt(partsB.numericPart) : 0;

  return numA - numB;
}

export const coursesRouter = createTRPCRouter({
  insert_all_data_lmao: publicProcedure
    .mutation(async ({ ctx }) => {
      const directoryPath = '/home/suri312006/coding/slugplanner/src/server/db/courses/';
      // Read the contents of the directory
      const files = fs.readdirSync(directoryPath);

      // Sort the file names using the custom sorting function
      const sortedFileNames = files.sort(customSort);

      // Log the sorted file names
      console.log("dumb", sortedFileNames);
      console.log(files)

      // Iterate through each file
      let num = 0;
      for (const file of sortedFileNames) {
        const filePath = path.join(directoryPath, file);
        // Check if it's a file (not a directory)
        // Do something with the file, for example, log its name
        const fileData = await fs.promises.readFile(filePath, "utf8")
        const course: Course = JSON.parse(fileData) as Course;
        console.log(course);
        await ctx.db.insert(courses).values({
          dept_num: course.dept_num,
          title: course.title,
          description: course.description,
          erlw: course.pre_req_data.conditions.erlw,
          prereq_text: course.pre_req_data.text,
          class_notes: course.class_notes,
          career: course.career,
          gen_ed_code: course.gen_ed_code,
          type: course.type,
          order: num

        })
        num += 1;
      }
    })
});


