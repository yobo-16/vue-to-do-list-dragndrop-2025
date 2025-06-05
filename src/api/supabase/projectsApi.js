import { supabase } from "@/api/supabase/index.js";

const TABLE_NAME = 'Projects';

// Function to get all projects
// export const getAllProjects = async () =>{
//     try {

//         const { data, error } = await supabase
//             .from(TABLE_NAME)
//             .select()

//             if (error){
//                 throw new Error(error.message);
//             }

//             console.log("Data fetched from Supabase:", data);

//             return data;
        
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// }

// Funtion tu create project

// export const createProject = async (title, description, priority, status, deadline, user_id) => {

//     try {

//          //const userId = (await supabase.auth.getUser()).data.user.id;

//         const { data, error } = await supabase
//             .from(TABLE_NAME)
//             .insert({
//                 title,
//                 description,
//                 priority,
//                 status,
//                 deadline,
//                 user_id
//                 //user_id:"f4e94541-0211-4446-aa79-18c23e3b3b18"
//             })
//             .select()

//             return data;

//     } catch (error) {
//         console.error(error);
//         return [];
//     }

// }



// Function to get all projects
export const getAllProjects = async () => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select();

    if (error) {
      throw new Error(error.message);
    }

    console.log("Data fetched from Supabase:", data);

    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

// Function to create a project
export const createProject = async (title, description, priority, status, deadline, user_id) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          title,
          description,
          priority,
          status,
          deadline,
          user_id,
        },
      ])
      .select();

    if (error) {
      console.error("Error al insertar proyecto en Supabase:", error);
      throw error;
    }

    console.log("Proyecto insertado en Supabase:", data);
    return data;
  } catch (error) {
    console.error("Error creando proyecto en Supabase:", error);
    throw error;
  }
};