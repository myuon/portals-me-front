type H = "a" | "b";

describe("Test", () => {
  it("should do sth", () => {
    console.log("a" as H);
    expect(true).to.eq(false);
  });
});
