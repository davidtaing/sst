import { APIGatewayEvent, Context, Handler } from "aws-lambda";

type LambdaFunction<TEvent = any, TResult = any> = (
  event: TEvent,
  context: Context
) => void | Promise<TResult>;

export default function handler(lambda: LambdaFunction): Handler {
  return async function (event: any, context: Context) {
    let body, statusCode;

    try {
      // Run the Lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e: any) {
      console.error(e);
      body = { error: e.message };
      statusCode = 500;
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
    };
  };
}
