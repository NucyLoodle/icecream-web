import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { createSession } from "./app/lib/session";
import { getUser, auth } from "./auth";

jest.mock("next-auth", () => ({
    __esModule: true,
    default: jest.fn(() => ({
      signIn: jest.fn(),
      signOut: jest.fn(),
      auth: jest.fn(),
    })),
  }));

jest.mock("next-auth/providers/credentials", () => jest.fn());

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

jest.mock("postgres", () => {
    return jest.fn(() => ({
      // Mock SQL query function to return expected results
      query: jest.fn(),
      // Mocks `sql` as a function, similar to how `postgres()` works
      mockResolvedValueOnce: jest.fn(),
      mockRejectedValueOnce: jest.fn(),
    }));
  });

jest.mock("./app/lib/session", () => ({
  createSession: jest.fn(),
}));

jest.mock("./auth", () => ({
    getUser: jest.fn(),
  }));

// Mock database
const sqlMock = postgres();
sqlMock.query.mockResolvedValueOnce([
  { email: "test@example.com", password: "hashedpassword" },
]);
sqlMock.mockRejectedValueOnce(new Error("Database error"));
postgres.mockImplementation(() => sqlMock);

describe("Authentication", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUser()", () => {
      it("should return user when found", async () => {
        const mockUser = { email: "test@example.com", password: "hashedpassword" };

        getUser.mockResolvedValueOnce(mockUser);

        const user = await getUser("test@example.com");

        expect(user).toEqual(mockUser);
        expect(getUser).toHaveBeenCalledWith("test@example.com");

  });

  // it("should throw an error when the query fails", async () => {
  //   const mockUser = { email: null, password: null };
  //   getUser.mockResolvedValueOnce(mockUser);
  //   sqlMock.query.mockRejectedValueOnce(new Error("Database error")); // Ensure failure

  //   await expect(getUser(null)).rejects.toThrow("Failed to fetch user.");

  //   expect(sqlMock.query).toHaveBeenCalled();
  // });
  // });

  describe("authorize()", () => {
    let authorize;

    beforeEach(() => {
      authorize = Credentials.mock.calls[0][0].authorize;
    });

    it("should return null if credentials are missing", async () => {
      const result = await authorize(null);
      expect(result).toBeNull();
    });

    it("should return null if email or password is missing", async () => {
      const result1 = await authorize({ email: "test@example.com" });
      const result2 = await authorize({ password: "password" });

      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });

    it("should return null if user is not found", async () => {
      jest.spyOn(global, "getUser").mockResolvedValueOnce(null);

      const result = await authorize({ email: "notfound@example.com", password: "password" });

      expect(result).toBeNull();
      expect(getUser).toHaveBeenCalledWith("notfound@example.com");
    });

    it("should return null if passwords do not match", async () => {
      const mockUser = { email: "test@example.com", password: "hashedpassword" };
      jest.spyOn(global, "getUser").mockResolvedValueOnce(mockUser);
      bcrypt.compare.mockResolvedValueOnce(false);

      const result = await authorize({ email: "test@example.com", password: "wrongpassword" });

      expect(result).toBeNull();
      expect(bcrypt.compare).toHaveBeenCalledWith("wrongpassword", "hashedpassword");
    });

    it("should return user and create session if credentials are valid", async () => {
      const mockUser = { email: "test@example.com", password: "hashedpassword" };
      jest.spyOn(global, "getUser").mockResolvedValueOnce(mockUser);
      bcrypt.compare.mockResolvedValueOnce(true);

      const result = await authorize({ email: "test@example.com", password: "correctpassword" });

      expect(result).toEqual(mockUser);
      expect(createSession).toHaveBeenCalledWith("test@example.com");
    });
  
  });
  })
})
