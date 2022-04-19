import { expect, test } from "vitest";
import { functionValue } from "./FunctionField";

test("create function value", () => {
    const func  = functionValue().default(() => { 
        return { a: 1}
    });

    const returnFunction = func.toJSON();

    expect(typeof returnFunction).toEqual("function");
    expect(returnFunction()).toEqual({ a: 1 });
})