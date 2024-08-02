import { auth } from '@/auth';
import { createSafeActionClient } from 'next-safe-action';
//import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE  } from 'next-safe-action';
import { zodAdapter } from "next-safe-action/adapters/zod";
import { cookies } from 'next/headers';

export class ActionError extends Error{};

export const actionClient = createSafeActionClient({
  validationAdapter: zodAdapter(),
  //defaultValidationErrorsShape: "flattened",
  handleReturnedServerError(e: ActionError) {
    if (e instanceof ActionError) {
      return {
        serverError: e.message,
      }
    }
    //return DEFAULT_SERVER_ERROR_MESSAGE 
    return {
      serverError: "Something went wrong!"
    }
  },
});

export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const session = cookies().get("session")?.value;

    if (!session) {
      throw new Error("Session not found!");
    }
    //const userId = await getUserIdFromSessionId(session);
    const userSession = await auth();
    if (!userSession?.user?.id) {
      throw new Error("Session is not valid!");
    }

    // Return the next middleware with `userId` value in the context
    return next({ ctx: { userSession } });
  });