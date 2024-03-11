import { expect, test } from "@playwright/test";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

test.describe("Test for tasks API", () => {
  test.describe("Test for Create task", () => {
    test("Create new task then succeeded", async ({ request }) => {
      const issue = await request.post(`/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: "task 1",
          description: "description 1",
          deadline: "2019-08-24T14:15:22Z",
        },
      });
      expect(issue.ok()).toBeTruthy();
      expect(issue.status()).toBe(201);
      expect(await issue.json()).toEqual({
        id: expect.any(Number),
      });
    });
    test("Create new task with no Authorization header then failed", async ({
      request,
    }) => {
      const issue = await request.post(`/tasks`, {
        data: {
          name: "task 1",
          description: "description 1",
          deadline: "2019-08-24T14:15:22Z",
        },
      });
      expect(issue.ok()).toBeFalsy();
      expect(issue.status()).toBe(401);
    });
  });

  test.describe("Test for fetch tasks", () => {
    test("Fetch all tasks then succeeded", async ({ request }) => {
      const issue = await request.get(`/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: 0,
        },
      });
      expect(issue.ok()).toBeTruthy();
      expect(await issue.json()).toContainEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          deadline: expect.any(String),
          completed: expect.any(Boolean),
        })
      );
    });
    test("Fetch all tasks with no Authorization header then failed", async ({
      request,
    }) => {
      const issue = await request.get(`/tasks`, {
        params: {
          userId: 0,
        },
      });
      expect(issue.ok()).toBeFalsy();
      expect(issue.status()).toBe(401);
    });
    test("Fetch all tasks with invalid userId then failed", async ({
      request,
    }) => {
      const issue = await request.get(`/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(issue.ok()).toBeFalsy();
      expect(issue.status()).toBe(400);
    });
  });

  test.describe("Test for update task", () => {
    test("Update task then succeeded", async ({ request }) => {
      const issue = await request.put(`/tasks/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: "task 1 updated",
          description: "description 1 updated",
          deadline: "2019-08-24T14:15:22Z",
        },
      });
      expect(issue.ok()).toBeTruthy();
      expect(issue.status()).toBe(200);
      expect(await issue.json()).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        deadline: expect.any(String),
        completed: expect.any(Boolean),
      });
    });
    test("Update task with no Authorization header then failed", async ({
      request,
    }) => {
      const issue = await request.put(`/tasks/1`, {
        data: {
          name: "task 1 updated",
          description: "description 1 updated",
          deadline: "2019-08-24T14:15:22Z",
        },
      });
      expect(issue.ok()).toBeFalsy();
      expect(issue.status()).toBe(401);
    });
  });

  test.describe("Test for delete task", () => {
    test("Delete task then succeeded", async ({ request }) => {
      const issue = await request.delete(`/tasks/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: true,
      });
      expect(issue.ok()).toBeTruthy();
      expect(issue.status()).toBe(204);
    });
    test("Delete task with no Authorization header then failed", async ({
      request,
    }) => {
      const issue = await request.delete(`/tasks/1`);
      expect(issue.ok()).toBeFalsy();
      expect(issue.status()).toBe(401);
    });
  });
});
