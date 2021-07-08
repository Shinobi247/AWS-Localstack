"use strict";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-east-2",
  endpoint: "http://localhost:4566",
});
// const logger = require("../../logger");
const Items = [
  {
    TableName: "sandbox-id-verification",
    Item: {
      firstName: "Corray",
      lastName: "LaFleur",
      environment: "prod",
      learnerId: "a0i1M00000gAhr5QAC",
      idVerifyStatus: "submitted",
      idVerifyDate: "2020-08-21",
      source: "EA",
      image_uuid: "fa8685fd-f1d2-4519-84f1-de8db5d651e8",
    },
  },
  {
    TableName: "dev-salesforce-openedx-oauth",
    Item: {
      application: "salesforce",
      createDate: 1602834310731,
      tokenDetails: {
        access_token:
          "00D3F000000A0QD!AQoAQNfEekSaVtBFqmc5_B7GhAr3oeCFDb2QA_MTQGbFbaalaUQlydwqpMFyZNY.kEmlUdIk7jvSuvncsco_W11Hr6hvJ_Ll",
        id: "https://test.salesforce.com/id/00D3F000000A0QDUA0/005410000029LkbAAE",
        instance_url: "https://edplus-asu--EADev.my.salesforce.com",
        issued_at: "1602834310728",
        signature: "XJgIR7TnFpyFrca7ojoWTtuxOtRUZqNc90Uz26mSQmM=",
        token_type: "Bearer",
      },
    },
  },
];

Items.forEach((e) => {
  if (e.Item instanceof Array) {
    e.Item.forEach((i) => {
      docClient.put(
        {
          TableName: e.TableName,
          Item: i,
        },
        function (err, data) {
          if (err)
            console.error(
              "Failed to add data to table " + e.TableName + " ",
              err
            );

          if (data) console.info("Added data " + e.TableName);
        }
      );
    });
  } else {
    docClient.put(e, function (err, data) {
      if (err) console.error("Failed to add data to table " + e.TableName, err);

      if (data) console.info("Added data " + e.TableName);
    });
  }
});
