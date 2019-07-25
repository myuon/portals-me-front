import uuid from "uuid/v4";

let env: {
  domain: string;
  restApi: string;
  tableName: string;
};

const testUser = {
  id: uuid(),
  name: `test_${uuid().replace(/\-/g, "_")}`,
  password: uuid(),
  display_name: "Test User",
  picture: "pic"
};

before(() => {
  cy.exec("pulumi stack output output -s myuon/portals-me-account/dev").then(
    result => {
      env = JSON.parse(result.stdout);

      cy.exec(
        `TABLE_NAME=${env.tableName} USER='${JSON.stringify(
          testUser
        )}' ts-node tests/setup.ts`
      );
    }
  );
});

after(() => {
  cy.exec(
    `TABLE_NAME=${env.tableName} USER='${JSON.stringify(
      testUser
    )}' ts-node tests/teardown.ts`
  );
});

describe("Post", () => {
  before(() => {
    cy.visit("/signin-password");

    cy.get("#password-form").within($elem => {
      cy.get('[data-cy="user-name"]').type(testUser.name);
      cy.get('[data-cy="password"]').type(testUser.password);
      cy.get('[data-cy="submit"]').click();

      cy.location("pathname").should("eq", "/dashboard");
    });
  });

  beforeEach(() => {
    cy.visit("/dashboard");
  });

  it("should post an article", () => {
    cy.get("#create-post").within($elem => {
      cy.get('[data-cy="open-article"]').click();
      cy.get('[data-cy="article-title"]').type(
        `Test - ${new Date().toDateString()}`
      );
      cy.get('[data-cy="article-content"]').type(`# Hello World

This is a sentence.

- a
- b
- c
`);
      cy.get('[data-cy="submit"]').click();
    });
  });
});
