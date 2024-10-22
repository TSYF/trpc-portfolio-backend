import { z } from "zod";

export default z.object({
    mode: z.custom<string>().refine(mode => mode === "dev" || mode === "prod", "Invalid mode"),
    maintenance: z.boolean(),
})