//import { auth } from '@/auth';
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE  } from 'next-safe-action';
import { z } from 'zod';

export class ActionError extends Error{};

//export const actionClient = createSafeActionClient();
export const actionClient = createSafeActionClient({
  //defaultValidationErrorsShape: "flattened",
  defineMetadataSchema() {
    return z.object({
      id: z.number(),
    });
  },
  handleReturnedServerError(e: ActionError) {
    if (e instanceof ActionError) {
      return {
        serverError: e.message,
      }
    }
    //return DEFAULT_SERVER_ERROR_MESSAGE 
    //return "Oh no, something went wrong!";
    return {
      serverError: "Something went wrong!"
    }
  },
});

/* export const actionClient = createSafeActionClient({
  //defaultValidationErrorsShape: "flattened",
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return {
        serverError: e.message,
      }
    }
    return DEFAULT_SERVER_ERROR_MESSAGE 
    //return "Oh no, something went wrong!";

    return {
      serverError: "Something went wrong!"
    }
  },
}); */


/* export const AuthenticatedAction = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return {
        serverError: e.message,
      }
    }
    return {
      serverError: "Something went wrong!"
    }
  },
  async middleware(): Promise<{userId: string}> {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Invalid session");
    }
    return {
      userId: session.user.id
    }
  }
}); */
