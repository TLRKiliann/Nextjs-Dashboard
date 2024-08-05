import { auth } from '@/auth';
import { createSafeActionClient } from 'next-safe-action';
import { zodAdapter } from "next-safe-action/adapters/zod";
import { cookies } from 'next/headers';

/*
  next-safe-action for server action in action.ts
*/

export class ActionError extends Error{};

export const actionClient = createSafeActionClient({
  validationAdapter: zodAdapter(),
  handleReturnedServerError(e: ActionError) {
    if (e instanceof ActionError) {
      return {
        serverError: e.message,
      }
    } 
    return {
      serverError: "Something went wrong!"
    }
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
    const session = cookies().get("authjs.session-token")?.value;

    if (!session) {
      throw new Error("Session not found!");
    };

    const userSessionId = await auth();
    
    if (!userSessionId?.user?.id) {
      throw new Error("Session is not valid!");
    };

    const userId = userSessionId.user.id;

    return next({ ctx: { userId } }); 
});