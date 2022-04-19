import { expect, test } from "vitest";
import { anyValue } from "./AnyField";

test("create any value", () => {
    const any  = anyValue().default(function() {});

    const returnAny = any.toJSON();

    expect(typeof returnAny).toEqual("function");
    expect(returnAny()).toEqual(undefined);

    const any2  = anyValue().default([1,2,3]);

    const returnAny2 = any2.toJSON();

    expect(typeof returnAny2).toEqual("object");
    expect(returnAny2).toEqual([1,2,3]);
})