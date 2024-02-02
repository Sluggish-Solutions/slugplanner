
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { courses, posts } from "~/server/db/schema";
import type { Course } from "~/server/db";
import * as fs from 'fs';
import * as path from 'path';

export const coursesRouter = createTRPCRouter({
  insert_all_data_lmao: publicProcedure
    .mutation(async ({ ctx }) => {
      const directoryPath = '/home/suri312006/coding/slugplanner/src/server/db/courses/';
      // Read the contents of the directory
      const files = fs.readdirSync(directoryPath);
      
    console.log(files)

      // Iterate through each file
      let num = 0;
      for (const file of files) {
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
        // fs.readFile(filePath, 'utf8', (err, data) => {
        //   if (err) {
        //     console.error('Error reading the file:', err);
        //     return;
        //   }
        //   let courseData: Course;
        //
        //   // Parse the content as JSON
        //   const jsonData = JSON.parse(data) as Course;
        //   allCourses.push(jsonData);
        //   console.log(jsonData);
        //   // await ctx.db.insert(courses).values({
        //   // Now, you can work with the parsed JSON object
        // });
      }
    })
});


//  files.forEach( async (file) => {
//   // Get the full path of the file
// });
// for (const course of allCourses) {
//   console.log(course)
// }




// } catch (error) {
//   console.error('Error reading directory:', error);
// }
