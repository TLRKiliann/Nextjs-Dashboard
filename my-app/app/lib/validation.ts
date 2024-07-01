import { zfd } from "zod-form-data";
import { z } from "zod";

export const formSchema = zfd.formData({
    username: zfd.text(z.string().min(4, "Too short").max(20, "Too long")),
    password: zfd.text(z.string().min(8, "Too short").max(20, "Too long")),
});