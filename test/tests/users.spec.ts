import { expect, test } from "@playwright/test";

test.describe("Test for users API", () => {
  test("Register user", async ({ request }) => {
    const issue = await request.post(`/users`, {
      data: {
        email: "user@example.com",
        password: "password",
      },
    });
    expect(issue.ok()).toBeTruthy();
    expect(await issue.json()).toEqual({
      id: expect.any(Number),
    });
  });
});
