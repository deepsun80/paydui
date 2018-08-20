import { Auth, Token } from "./agent";

describe("Auth", () => {
  it("login", async () => {
    await Auth.login("joeschmoe", "f00barbaz");

    const user = await Auth.current();

    expect(user.username).toEqual("joeschmoe");
  });

  it("token refresh", async () => {
    await Auth.login("joeschmoe", "f00barbaz");
    const token1 = Token.get();

    await Auth.refresh(token1);
    const token2 = Token.get();

    expect(token1).not.toEqual(token2);
  });
});
