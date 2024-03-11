import { expect, test } from "@playwright/test";

test.describe("Test for auth API", () => {
  test("Fetch auth token", async ({ request }) => {
    const issue = await request.post(`/auth`, {
      data: {
        email: "user@example.com",
        password: "password",
      },
    });
    expect(issue.ok()).toBeTruthy();
    expect(await issue.json()).toEqual({
      token: expect.any(String),
    });
  });
});
