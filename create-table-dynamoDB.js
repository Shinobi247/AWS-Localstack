"use strict";

const AWS = require("aws-sdk");
const currentEnv = process.env.NODE_ENV || "localhost";
// const logger = require("../../logger");

const client = new AWS.DynamoDB({
  region: "us-east-2",
  ...(currentEnv === "localhost" && {
    endpoint: "http://localhost:4566/",
  }),
});

console.info(`Running script for ${currentEnv}`);

const createTable = async (TableName, KeySchema, AttributeDefinitions) => {
  try {
    await client
      .describeTable({
        TableName: TableName,
      })
      .promise();

    console.info(
      `Table ${TableName} already exists. Use UpdateTable to update table schema or config`
    );
  } catch (err) {
    if (err.code === "ResourceNotFoundException") {
      const params = {
        TableName,
        KeySchema,
        AttributeDefinitions,
        ...(currentEnv === "localhost" && {
          ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
          },
        }),
        BillingMode: "PAY_PER_REQUEST",
      };

      client.createTable(params, function (tableErr, tableData) {
        if (tableErr) {
          console.error("Error JSON:", JSON.stringify(tableErr, null, 2));
        } else {
          console.info(`Created ${TableName} table successfully!`);
        }
      });
      return;
    } else {
      console.info(
        `Error occurred while describing table ${TableName}:\n`,
        err
      );

      return;
    }
  }
};

const tables = [
  {
    TableName: "TableName",
    KeySchema: [
      { AttributeName: "idVerifyDate", KeyType: "HASH" },
      { AttributeName: "learnerId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "idVerifyDate", AttributeType: "S" },
      { AttributeName: "learnerId", AttributeType: "S" },
    ],
  },
  {
    TableName: "TableName",
    KeySchema: [{ AttributeName: "application", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "application", AttributeType: "S" },
    ],
  },
];

for (let index = 0; index < tables.length; index++) {
  const element = tables[index];

  createTable(
    element.TableName,
    element.KeySchema,
    element.AttributeDefinitions
  );
}
